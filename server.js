const express = require('express');
const { getDatabase } = require('./database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'dtv-visa-guide-secret-key-2025';

// Database reference (initialized async)
let db = null;

// Security & Performance Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1d',
    etag: true,
    lastModified: true
}));

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { error: '请求过于频繁，请15分钟后再试' },
    standardHeaders: true,
    legacyHeaders: false
});
app.use('/api/login', authLimiter);
app.use('/api/register', authLimiter);

// ========================================
// Database Setup (called after async init)
// ========================================
function setupDatabase(database) {
    db = database;
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

    // Create tables
    db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    avatar TEXT DEFAULT '',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    parent_id INTEGER DEFAULT NULL,
    visible INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (parent_id) REFERENCES comments(id)
  );

  CREATE TABLE IF NOT EXISTS cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    author TEXT DEFAULT '',
    tags TEXT DEFAULT '',
    thumbnail TEXT DEFAULT '',
    visible INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section_key TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    visible INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS knowledge (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    visible INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

    // Add content column to cases if not exists
    try { db.exec('ALTER TABLE cases ADD COLUMN content TEXT DEFAULT ""'); } catch (e) { }

    // Initialize default settings
    const settingExists = db.prepare('SELECT key FROM settings WHERE key = ?').get('show_source');
    if (!settingExists) {
        db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run('show_source', '1');
    }

    // ========================================
    // Seed data - Default admin, sections, cases, knowledge
    // ========================================
    function seedData() {
        // Create admin user if not exists
        const adminExists = db.prepare('SELECT id FROM users WHERE role = ?').get('admin');
        if (!adminExists) {
            const hash = bcrypt.hashSync('admin123', 10);
            db.prepare('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)').run('admin', 'admin@dtv-guide.com', hash, 'admin');
        }

        // Seed sections
        const sectionCount = db.prepare('SELECT COUNT(*) as c FROM sections').get().c;
        if (sectionCount === 0) {
            const sections = [
                ['hero', '首页横幅', 1, 1],
                ['overview', '签证概览', 1, 2],
                ['eligibility', '申请资格', 1, 3],
                ['documents', '所需材料', 1, 4],
                ['process', '办理流程', 1, 5],
                ['fees', '费用明细', 1, 6],
                ['cases', '教程案例', 1, 7],
                ['notes', '注意事项', 1, 8],
                ['faq', '常见问题', 1, 9],
                ['comments', '用户留言', 1, 10],
            ];
            const insert = db.prepare('INSERT INTO sections (section_key, title, visible, sort_order) VALUES (?, ?, ?, ?)');
            sections.forEach(s => insert.run(...s));
        }

        // Seed cases
        const caseCount = db.prepare('SELECT COUNT(*) as c FROM cases').get().c;
        if (caseCount === 0) {
            const cases = [
                // YouTube Cases
                ['DTV签证完整申请教程 - 2025最新版', '手把手教你从注册电子签证账户到获批全流程，包含材料准备清单和常见错误提醒。', 'youtube', 'https://www.youtube.com/results?search_query=Thailand+DTV+visa+application+tutorial+2025', 'DTV Visa Guide', '教程,申请流程,2025', '', 1, 1],
                ['我如何在一周内获批泰国5年DTV签证', '分享从准备材料到获批的完整经历，包括选择在哪个使馆申请效率最高。', 'youtube', 'https://www.youtube.com/results?search_query=how+I+got+Thailand+DTV+visa+approved', 'Digital Nomad Vlog', '经验分享,快速获批', '', 1, 2],
                ['数字游民的DTV签证申请：自由职业者篇', '作为自由职业者，如何准备作品集和收入证明来申请DTV签证的详细指南。', 'youtube', 'https://www.youtube.com/results?search_query=DTV+visa+freelancer+digital+nomad+application', 'Freelancer Life', '自由职业,作品集', '', 1, 3],
                ['DTV签证 vs 其他泰国签证对比分析', '详细对比DTV签证与旅游签、商务签、精英签的优缺点，帮你选择最适合的签证类型。', 'youtube', 'https://www.youtube.com/results?search_query=Thailand+DTV+visa+comparison+other+visas', 'Thailand Expat', '签证对比,选择', '', 1, 4],
                ['通过泰拳课程申请DTV签证的完整经验', '选择"软实力"路线，通过报名泰拳课程成功申请DTV签证的经验分享。', 'youtube', 'https://www.youtube.com/results?search_query=DTV+visa+Muay+Thai+soft+power+application', 'Muay Thai Channel', '软实力,泰拳', '', 1, 5],
                ['DTV签证财务证明深度解析', '详细讲解50万泰铢资金要求的各种满足方式，银行流水如何准备。', 'youtube', 'https://www.youtube.com/results?search_query=DTV+visa+financial+requirements+bank+statement', 'Finance Tips', '资金证明,银行流水', '', 1, 6],
                ['在柬埔寨申请泰国DTV签证的经验', '选择在第三国申请DTV签证的策略分享，柬埔寨使馆申请流程和时间线。', 'youtube', 'https://www.youtube.com/results?search_query=apply+DTV+visa+Cambodia+third+country', 'Travel Vlogger', '第三国申请,柬埔寨', '', 1, 7],
                ['DTV签证被拒后如何重新申请', '分析常见被拒原因并分享二次申请成功的修正策略。', 'youtube', 'https://www.youtube.com/results?search_query=DTV+visa+rejected+reapply+tips', 'Visa Expert', '被拒,重新申请', '', 1, 8],
                ['DTV签证入境泰国后的生活指南', '获批后入境泰国的注意事项、90天报告、延期流程和日常生活安排。', 'youtube', 'https://www.youtube.com/results?search_query=DTV+visa+Thailand+life+after+arrival+90+day', 'Living in Thailand', '入境后,生活指南', '', 1, 9],
                ['带家人一起申请DTV签证的经验', '一家三口申请DTV签证的完整攻略，包括配偶和子女的材料准备。', 'youtube', 'https://www.youtube.com/results?search_query=DTV+visa+family+application+spouse+children', 'Family Travel', '家庭申请,配偶子女', '', 1, 10],

                // X (Twitter) Cases
                ['远程工程师的DTV签证申请日记', '一位软件工程师在X上分享的DTV签证申请全过程，从准备到获批的时间线记录。', 'x', 'https://x.com/search?q=Thailand%20DTV%20visa%20approved&f=live', '@TechNomad', '工程师,远程工作', '', 1, 11],
                ['DTV签证2025年新政策更新速递', '关注泰国签证政策变动，第一时间了解2025年DTV签证的最新调整。', 'x', 'https://x.com/search?q=Thailand%20DTV%20visa%202025%20update&f=live', '@ThaiVisaNews', '政策更新,2025', '', 1, 12],
                ['从香港申请DTV签证的实战分享', '在香港泰国领事馆申请DTV签证的具体流程和经验分享。', 'x', 'https://x.com/search?q=DTV%20visa%20Hong%20Kong%20application&f=live', '@HKNomad', '香港申请,领事馆', '', 1, 13],
                ['设计师申请DTV签证的作品集准备', '用设计师的视角分享如何准备令人信服的自由职业者作品集。', 'x', 'https://x.com/search?q=DTV%20visa%20freelancer%20portfolio&f=live', '@DesignNomad', '设计师,作品集准备', '', 1, 14],
                ['DTV签证持有者的泰国银行开户攻略', '获得DTV签证后在泰国开银行账户的经验和注意事项。', 'x', 'https://x.com/search?q=DTV%20visa%20Thailand%20bank%20account&f=live', '@ExpatFinance', '银行开户,入境后', '', 1, 15],
                ['泰国DTV签证税务问题详解', '分享DTV签证持有者在泰国的税务义务和合规建议。', 'x', 'https://x.com/search?q=DTV%20visa%20Thailand%20tax%20obligations&f=live', '@TaxAdvisor', '税务,合规', '', 1, 16],
                ['DTV签证线上申请系统避坑指南', '总结线上申请中容易犯的错误和系统操作的注意事项。', 'x', 'https://x.com/search?q=Thailand%20evisa%20DTV%20application%20tips&f=live', '@VisaTips', '线上申请,避坑', '', 1, 17],
                ['DTV签证社群推荐和互助资源', '推荐Facebook群组、Telegram频道等DTV签证申请者互助社群。', 'x', 'https://x.com/search?q=DTV%20visa%20community%20group%20digital%20nomad&f=live', '@NomadNetwork', '社群,互助', '', 1, 18],
                ['通过烹饪课程申请DTV签证的经历', '选择泰式烹饪作为"软实力"活动申请DTV签证的案例分享。', 'x', 'https://x.com/search?q=DTV%20visa%20cooking%20class%20soft%20power&f=live', '@FoodieNomad', '烹饪课程,软实力', '', 1, 19],
                ['DTV签证180天延期的详细流程', '在泰国境内办理180天延期的完整流程、所需材料和注意事项。', 'x', 'https://x.com/search?q=DTV%20visa%20extension%20180%20days%20Thailand&f=live', '@ThaiImmigration', '延期,180天', '', 1, 20],

                // 小红书 Cases
                ['小红书达人分享：DTV签证DIY申请全攻略', '从材料准备到在线填表的超详细保姆级教程，附带材料模板下载。', 'xiaohongshu', 'https://www.xiaohongshu.com/search_result?keyword=DTV%E7%AD%BE%E8%AF%81', '旅行小达人', 'DIY,保姆级教程', '', 1, 21],
                ['程序员在泰国远程办公：DTV签证申请记', '互联网从业者分享如何利用远程工作合同申请DTV签证的完整经历。', 'xiaohongshu', 'https://www.xiaohongshu.com/search_result?keyword=DTV%E7%AD%BE%E8%AF%81%E7%94%B3%E8%AF%B7', '码农在泰国', '程序员,远程工作', '', 1, 22],
                ['闺蜜团一起申请DTV签证的故事', '三个好朋友一起申请DTV签证、一起飞泰国开始新生活的故事。', 'xiaohongshu', 'https://www.xiaohongshu.com/search_result?keyword=DTV%E7%AD%BE%E8%AF%81%E7%BB%8F%E9%AA%8C', '泰美丽生活', '结伴申请,故事', '', 1, 23],
                ['DTV签证存款证明怎么开？银行柜台实拍', '实拍在国内银行开具50万泰铢等值存款证明的全过程。', 'xiaohongshu', 'https://www.xiaohongshu.com/search_result?keyword=DTV%E7%AD%BE%E8%AF%81%E5%AD%98%E6%AC%BE', '签证小助手', '存款证明,银行', '', 1, 24],
                ['被拒签后的DTV二签成功经验', '第一次因材料不全被拒签，调整后二签成功的心路历程和修改要点。', 'xiaohongshu', 'https://www.xiaohongshu.com/search_result?keyword=DTV%E7%AD%BE%E8%AF%81%E6%8B%92%E7%AD%BE', '永不放弃', '拒签,二签成功', '', 1, 25],
                ['在昆明泰国领事馆申请DTV签证攻略', '在昆明泰国总领事馆现场办理DTV签证的流程和窗口指南。', 'xiaohongshu', 'https://www.xiaohongshu.com/search_result?keyword=DTV%E7%AD%BE%E8%AF%81%E6%98%86%E6%98%8E', '昆明小花', '昆明,现场办理', '', 1, 26],
                ['自由撰稿人的DTV签证申请心得', '作为自由撰稿人/内容创作者如何准备职业证明和收入材料。', 'xiaohongshu', 'https://www.xiaohongshu.com/search_result?keyword=DTV%E7%AD%BE%E8%AF%81%E8%87%AA%E7%94%B1%E8%81%8C%E4%B8%9A', '笔下生花', '撰稿人,内容创作', '', 1, 27],
                ['带娃申请DTV签证：一家人的泰国梦', '一家四口申请DTV签证的全过程，含孩子所需的特别材料清单。', 'xiaohongshu', 'https://www.xiaohongshu.com/search_result?keyword=DTV%E7%AD%BE%E8%AF%81%E5%B8%A6%E5%A8%83', '亲子旅行家', '带娃,家庭', '', 1, 28],
                ['DTV签证 vs 泰国精英签：哪个更划算？', '从费用、便利性、权益多维度对比DTV签证和泰国精英签的优劣。', 'xiaohongshu', 'https://www.xiaohongshu.com/search_result?keyword=DTV%E7%AD%BE%E8%AF%81%E7%B2%BE%E8%8B%B1%E7%AD%BE', '精打细算', '对比,精英签', '', 1, 29],
                ['在清迈生活半年：DTV签证持有者的真实体验', '使用DTV签证在清迈生活半年的真实感受，包括住房、交通、美食推荐。', 'xiaohongshu', 'https://www.xiaohongshu.com/search_result?keyword=DTV%E7%AD%BE%E8%AF%81%E6%B8%85%E8%BF%88', '清迈日记', '清迈生活,真实体验', '', 1, 30],
            ];

            const insertCase = db.prepare('INSERT INTO cases (title, description, platform, url, author, tags, thumbnail, visible, sort_order) VALUES (?,?,?,?,?,?,?,?,?)');
            cases.forEach(c => insertCase.run(...c));
        }

        // Seed knowledge base
        const kbCount = db.prepare('SELECT COUNT(*) as c FROM knowledge').get().c;
        if (kbCount === 0) {
            const kbItems = [
                ['DTV签证是什么？', 'DTV (Destination Thailand Visa) 是泰国于2024年7月推出的5年多次入境签证，专门面向数字游民、远程工作者、自由职业者以及参与泰国"软实力"活动的人群。', '基础知识'],
                ['DTV签证有效期是多久？', 'DTV签证有效期为5年，在此期间可无限次出入泰国。每次入境可停留180天，并可在泰国境内延期一次180天。', '基础知识'],
                ['申请DTV签证需要多少存款？', '需要个人银行账户余额不低于50万泰铢（约11万人民币/15,000美元），且余额建议保持至少3个月。不接受投资账户、公司账户或加密货币。', '资金要求'],
                ['DTV签证费用是多少？', '签证申请费为10,000泰铢（约2,300人民币），不同使馆可能略有差异。境内延期费用为1,900泰铢。', '费用'],
                ['可以在泰国境内申请DTV签证吗？', '不可以。DTV签证必须在泰国境外申请，可通过线上电子签证系统或泰国驻外使领馆办理。', '申请流程'],
                ['DTV签证允许在泰国工作吗？', '允许为海外（非泰国）雇主远程工作，但不可为泰国公司工作、不可获得泰国工作许可证、不可向泰国客户开具发票。', '工作限制'],
                ['什么是90天报告？', '如在泰国连续停留超过90天，需每90天向移民局报告居住地址，可在线办理(immigration.go.th)。未按时报告可能面临2,000泰铢罚款。', '入境后'],
                ['DTV签证可以带家人吗？', '可以。合法配偶及20岁以下子女可作为随行家属一同申请，需提供结婚证/出生证等关系证明。', '家属'],
                ['DTV签证审批需要多长时间？', '通常5-15个工作日。邻近国家约1周，欧美地区2-4周。建议至少提前2周提交申请。', '申请流程'],
                ['自由职业者如何证明身份？', '可提供专业作品集、个人网站、客户合同、平台收入记录、LinkedIn页面、相关资质证书等。', '申请材料'],
                ['2025年有什么新政策？', '2025年起语言学校不再被接受为"软实力"活动类别；泰国电子签证系统全球化扩展；部分使馆财务要求可能调整。', '政策更新'],
                ['DTV签证被拒的常见原因有哪些？', '资金不足、职业证明不充分、信息填写错误、有逾期记录、材料翻译不规范、提供虚假信息等。', '常见问题'],
                ['中国公民从哪里申请？', '可通过thaievisa.go.th在线申请，或前往北京、上海、广州、成都、昆明、南宁、厦门、西安、青岛的泰国使领馆办理。', '申请地点'],
                ['DTV签证需要医疗保险吗？', '强烈建议购买覆盖泰国的旅行保险（保额不低于5万美元），部分使馆可能强制要求。', '申请材料'],
                ['泰国DTV签证的税务影响？', '如在泰国停留不超过180天/年，海外收入通常不需缴纳泰国所得税。超过180天可能被视为税务居民。建议咨询专业税务顾问。', '税务'],
                ['什么是"软实力"活动？', '包括泰拳训练、泰式烹饪课程、体育培训、医疗保健、音乐节、艺术展、研讨会等泰国文化相关活动。2025年起语言学校不再被接受。', '软实力'],
                ['多久可以延期一次？', '每次入境后的180天即将到期前，可在泰国移民局申请延期一次，获得额外180天。费用1,900泰铢。延期到期后需离境再入境。', '延期'],
                ['申请被拒后可以重新申请吗？', '可以重新申请，但需分析被拒原因并完善材料。签证费不退还，重新申请需再次缴费。', '常见问题'],
                ['DTV签证和精英签有什么区别？', 'DTV签证费约2,300元人民币，允许远程工作；精英签费用50-200万泰铢，是会员制签证，享受VIP礼遇服务。根据预算和需求选择。', '签证对比'],
                ['护照有效期有什么要求？', '护照有效期需距出行日期至少6个月，且至少有1页空白签证页。', '申请材料'],
            ];
            const insertKB = db.prepare('INSERT INTO knowledge (question, answer, category, visible, sort_order) VALUES (?, ?, ?, 1, ?)');
            kbItems.forEach((item, i) => insertKB.run(item[0], item[1], item[2], i + 1));
        }
    }

    seedData();
} // end setupDatabase

// ========================================
// Auth Middleware
// ========================================
function authMiddleware(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: '请先登录' });
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        return res.status(401).json({ error: '登录已过期，请重新登录' });
    }
}

function adminMiddleware(req, res, next) {
    if (req.user.role !== 'admin') return res.status(403).json({ error: '无管理员权限' });
    next();
}

// ========================================
// Auth Routes
// ========================================
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: '请填写所有字段' });
    if (password.length < 6) return res.status(400).json({ error: '密码至少6位' });

    try {
        const hash = bcrypt.hashSync(password, 10);
        db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)').run(username, email, hash);
        res.json({ success: true, message: '注册成功' });
    } catch (e) {
        if (e.message.includes('UNIQUE')) {
            return res.status(400).json({ error: '用户名或邮箱已存在' });
        }
        res.status(500).json({ error: '注册失败' });
    }
});

app.post('/api/login', (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) return res.status(400).json({ error: '请填写登录信息' });

    const user = db.prepare('SELECT * FROM users WHERE username = ? OR email = ?').get(login, login);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: '用户名/邮箱或密码错误' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ success: true, user: { id: user.id, username: user.username, role: user.role } });
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ success: true });
});

app.get('/api/me', authMiddleware, (req, res) => {
    const user = db.prepare('SELECT id, username, email, role, created_at FROM users WHERE id = ?').get(req.user.id);
    res.json({ user });
});

// ========================================
// Public API Routes
// ========================================

// Knowledge base search
app.get('/api/knowledge', (req, res) => {
    const { q } = req.query;
    let items;
    if (q) {
        items = db.prepare('SELECT * FROM knowledge WHERE visible = 1 AND (question LIKE ? OR answer LIKE ? OR category LIKE ?) ORDER BY sort_order').all(`%${q}%`, `%${q}%`, `%${q}%`);
    } else {
        items = db.prepare('SELECT * FROM knowledge WHERE visible = 1 ORDER BY sort_order').all();
    }
    res.json({ items });
});

// Cases
app.get('/api/cases', (req, res) => {
    const { platform, q } = req.query;
    let sql = 'SELECT * FROM cases WHERE visible = 1';
    const params = [];
    if (platform) { sql += ' AND platform = ?'; params.push(platform); }
    if (q) { sql += ' AND (title LIKE ? OR description LIKE ? OR tags LIKE ?)'; params.push(`%${q}%`, `%${q}%`, `%${q}%`); }
    sql += ' ORDER BY sort_order';
    const showSource = db.prepare('SELECT value FROM settings WHERE key = ?').get('show_source');
    res.json({ cases: db.prepare(sql).all(...params), show_source: showSource?.value === '1' });
});

// Settings (public - read only)
app.get('/api/settings/:key', (req, res) => {
    const setting = db.prepare('SELECT value FROM settings WHERE key = ?').get(req.params.key);
    res.json({ value: setting?.value ?? null });
});

// Sections visibility
app.get('/api/sections', (req, res) => {
    const sections = db.prepare('SELECT * FROM sections ORDER BY sort_order').all();
    res.json({ sections });
});

// Comments - public read
app.get('/api/comments', (req, res) => {
    const comments = db.prepare(`
    SELECT c.*, u.username FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.visible = 1 AND c.parent_id IS NULL
    ORDER BY c.created_at DESC
    LIMIT 100
  `).all();

    // Get replies
    const replies = db.prepare(`
    SELECT c.*, u.username FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.visible = 1 AND c.parent_id IS NOT NULL
    ORDER BY c.created_at ASC
  `).all();

    const replyMap = {};
    replies.forEach(r => {
        if (!replyMap[r.parent_id]) replyMap[r.parent_id] = [];
        replyMap[r.parent_id].push(r);
    });

    comments.forEach(c => { c.replies = replyMap[c.id] || []; });
    res.json({ comments });
});

// Comments - post (requires auth)
app.post('/api/comments', authMiddleware, (req, res) => {
    const { content, parent_id } = req.body;
    if (!content || content.trim().length === 0) return res.status(400).json({ error: '留言内容不能为空' });
    if (content.length > 1000) return res.status(400).json({ error: '留言内容不能超过1000字' });

    db.prepare('INSERT INTO comments (user_id, content, parent_id) VALUES (?, ?, ?)').run(req.user.id, content.trim(), parent_id || null);
    res.json({ success: true });
});

// ========================================
// Admin API Routes
// ========================================

// Sections management
app.get('/api/admin/sections', authMiddleware, adminMiddleware, (req, res) => {
    res.json({ sections: db.prepare('SELECT * FROM sections ORDER BY sort_order').all() });
});

app.put('/api/admin/sections/:id', authMiddleware, adminMiddleware, (req, res) => {
    const { visible, title } = req.body;
    if (visible !== undefined) db.prepare('UPDATE sections SET visible = ? WHERE id = ?').run(visible ? 1 : 0, req.params.id);
    if (title) db.prepare('UPDATE sections SET title = ? WHERE id = ?').run(title, req.params.id);
    res.json({ success: true });
});

// Cases management
app.get('/api/admin/cases', authMiddleware, adminMiddleware, (req, res) => {
    res.json({ cases: db.prepare('SELECT * FROM cases ORDER BY sort_order').all() });
});

app.put('/api/admin/cases/:id', authMiddleware, adminMiddleware, (req, res) => {
    const { title, description, content, platform, url, author, tags, visible } = req.body;
    const updates = [];
    const params = [];
    if (title !== undefined) { updates.push('title = ?'); params.push(title); }
    if (description !== undefined) { updates.push('description = ?'); params.push(description); }
    if (content !== undefined) { updates.push('content = ?'); params.push(content); }
    if (platform !== undefined) { updates.push('platform = ?'); params.push(platform); }
    if (url !== undefined) { updates.push('url = ?'); params.push(url); }
    if (author !== undefined) { updates.push('author = ?'); params.push(author); }
    if (tags !== undefined) { updates.push('tags = ?'); params.push(tags); }
    if (visible !== undefined) { updates.push('visible = ?'); params.push(visible ? 1 : 0); }
    if (updates.length > 0) {
        params.push(req.params.id);
        db.prepare(`UPDATE cases SET ${updates.join(', ')} WHERE id = ?`).run(...params);
    }
    res.json({ success: true });
});

app.post('/api/admin/cases', authMiddleware, adminMiddleware, (req, res) => {
    const { title, description, content, platform, url, author, tags } = req.body;
    db.prepare('INSERT INTO cases (title, description, content, platform, url, author, tags, visible, sort_order) VALUES (?,?,?,?,?,?,?,1,(SELECT COALESCE(MAX(sort_order),0)+1 FROM cases))').run(title, description, content || '', platform, url, author || '', tags || '');
    res.json({ success: true });
});

// Settings management
app.get('/api/admin/settings', authMiddleware, adminMiddleware, (req, res) => {
    const settings = db.prepare('SELECT * FROM settings').all();
    const obj = {};
    settings.forEach(s => obj[s.key] = s.value);
    res.json({ settings: obj });
});

app.put('/api/admin/settings/:key', authMiddleware, adminMiddleware, (req, res) => {
    const { value } = req.body;
    db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(req.params.key, String(value));
    res.json({ success: true });
});

app.delete('/api/admin/cases/:id', authMiddleware, adminMiddleware, (req, res) => {
    db.prepare('DELETE FROM cases WHERE id = ?').run(req.params.id);
    res.json({ success: true });
});

// Knowledge management
app.get('/api/admin/knowledge', authMiddleware, adminMiddleware, (req, res) => {
    res.json({ items: db.prepare('SELECT * FROM knowledge ORDER BY sort_order').all() });
});

app.put('/api/admin/knowledge/:id', authMiddleware, adminMiddleware, (req, res) => {
    const { question, answer, category, visible } = req.body;
    const updates = [];
    const params = [];
    if (question !== undefined) { updates.push('question = ?'); params.push(question); }
    if (answer !== undefined) { updates.push('answer = ?'); params.push(answer); }
    if (category !== undefined) { updates.push('category = ?'); params.push(category); }
    if (visible !== undefined) { updates.push('visible = ?'); params.push(visible ? 1 : 0); }
    if (updates.length > 0) {
        params.push(req.params.id);
        db.prepare(`UPDATE knowledge SET ${updates.join(', ')} WHERE id = ?`).run(...params);
    }
    res.json({ success: true });
});

app.post('/api/admin/knowledge', authMiddleware, adminMiddleware, (req, res) => {
    const { question, answer, category } = req.body;
    db.prepare('INSERT INTO knowledge (question, answer, category, visible, sort_order) VALUES (?,?,?,1,(SELECT COALESCE(MAX(sort_order),0)+1 FROM knowledge))').run(question, answer, category || 'general');
    res.json({ success: true });
});

app.delete('/api/admin/knowledge/:id', authMiddleware, adminMiddleware, (req, res) => {
    db.prepare('DELETE FROM knowledge WHERE id = ?').run(req.params.id);
    res.json({ success: true });
});

// Comments management
app.get('/api/admin/comments', authMiddleware, adminMiddleware, (req, res) => {
    const comments = db.prepare('SELECT c.*, u.username FROM comments c JOIN users u ON c.user_id = u.id ORDER BY c.created_at DESC').all();
    res.json({ comments });
});

app.put('/api/admin/comments/:id', authMiddleware, adminMiddleware, (req, res) => {
    const { visible } = req.body;
    if (visible !== undefined) db.prepare('UPDATE comments SET visible = ? WHERE id = ?').run(visible ? 1 : 0, req.params.id);
    res.json({ success: true });
});

app.delete('/api/admin/comments/:id', authMiddleware, adminMiddleware, (req, res) => {
    db.prepare('DELETE FROM comments WHERE id = ?').run(req.params.id);
    res.json({ success: true });
});

// Users management
app.get('/api/admin/users', authMiddleware, adminMiddleware, (req, res) => {
    const users = db.prepare('SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC').all();
    res.json({ users });
});

// ========================================
// Serve admin page
// ========================================
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Fallback
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('[Error]', err.stack || err.message);
    res.status(500).json({ error: '服务器内部错误' });
});

// ========================================
// Async Server Startup
// ========================================
async function startServer() {
    const database = await getDatabase();
    setupDatabase(database);

    // Only start listening when run directly (not imported by serverless)
    if (require.main === module) {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🇹🇭 DTV签证指南服务器运行中: http://localhost:${PORT}`);
            console.log(`📊 管理后台: http://localhost:${PORT}/admin`);
            console.log(`🔑 默认管理员: admin / admin123`);
            console.log(`🔒 安全: Helmet + Rate Limiting + Gzip 已启用`);
        });
    }
}

startServer();

// Export for Netlify Functions
module.exports = app;
module.exports.startServer = startServer;
