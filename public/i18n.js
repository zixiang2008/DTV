// ========================================
// DTV Visa Guide - i18n (Internationalization)
// ========================================

const translations = {
    zh: {
        // --- Nav ---
        nav_logo_text: 'DTV签证指南',
        nav_overview: '签证概览',
        nav_eligibility: '申请资格',
        nav_documents: '所需材料',
        nav_process: '办理流程',
        nav_fees: '费用明细',
        nav_cases: '教程案例',
        nav_faq: '常见问题',
        nav_comments: '留言区',
        btn_login: '登录',
        btn_register: '注册',

        // --- Hero ---
        hero_badge: '2024-2025 最新政策',
        hero_title_1: '泰国 ',
        hero_title_highlight: 'DTV 签证',
        hero_title_2: '完全办理指南',
        hero_desc: 'Destination Thailand Visa（DTV）是泰国于2024年7月推出的全新5年多次入境签证，专为数字游民、远程工作者及泰国文化爱好者打造，每次入境可停留长达180天。',
        search_placeholder: '搜索DTV签证知识库... 例如：存款要求、延期、软实力',
        stat_validity: '5 年',
        stat_validity_label: '签证有效期',
        stat_stay: '180 天',
        stat_stay_label: '每次入境可停留',
        stat_entry: '多次入境',
        stat_entry_label: '不限入境次数',
        stat_fee: '≈ ¥2,300',
        stat_fee_label: '签证申请费',
        cta_process: '📋 查看办理流程',
        cta_cases: '🎬 教程案例',

        // --- Overview ---
        overview_title: '什么是 DTV 签证？',
        overview_subtitle: 'Destination Thailand Visa 是泰国政府为吸引全球人才和文化交流而推出的创新签证类型',
        overview_card1_title: '5年多次入境',
        overview_card1_desc: 'DTV签证有效期长达5年，持证人可在此期间不限次数出入泰国，无需每次重新申请签证，极其便利。',
        overview_card2_title: '远程工作合法化',
        overview_card2_desc: 'DTV签证允许持有者在泰国进行远程工作，为海外雇主提供服务，但不可受雇于泰国本地公司或向泰国客户开具发票。',
        overview_card3_title: '最长近一年停留',
        overview_card3_desc: '每次入境可停留180天，并可在泰国境内延期一次180天，最长可连续停留约360天，之后需出境再入境。',
        overview_card4_title: '携带家属',
        overview_card4_desc: 'DTV签证持有者的合法配偶及20岁以下子女可作为随行家属一同申请，提供关系证明即可。',

        // --- Eligibility ---
        elig_title: '谁可以申请 DTV 签证？',
        elig_subtitle: 'DTV签证主要面向三大类人群，申请人需年满20岁且无泰国签证逾期记录',
        elig_cat1_title: '数字游民 / 远程工作者',
        elig_cat1_items: [
            '为境外（非泰国）雇主远程工作的数字游民',
            '拥有海外雇佣合同的远程工作者',
            '自由职业者、独立顾问、内容创作者',
            '具有专业技能的外国人才',
            '需提供雇佣合同或专业作品集作为证明'
        ],
        elig_cat2_title: '泰国"软实力"活动参与者',
        elig_cat2_items: [
            '泰拳（Muay Thai）训练课程',
            '泰式烹饪培训',
            '体育培训及相关活动',
            '医疗保健与健康项目',
            '音乐节、艺术展、研讨会等文化活动',
            '⚠️ 2025年起语言学校不再被接受',
            '建议活动时长不少于6个月以提高通过率'
        ],
        elig_cat3_title: '随行家属',
        elig_cat3_items: [
            'DTV签证主申请人的合法配偶',
            '20岁以下的子女（包括收养子女）',
            '需提供结婚证/出生证/收养证明',
            '需提供主申请人的护照及DTV签证页复印件',
            '需提供主申请人的财务证明'
        ],

        // --- Documents ---
        docs_title: '所需申请材料',
        docs_subtitle: '请在申请前仔细准备以下材料，所有文件需为英文或泰文，其他语言需提供官方翻译',
        doc_items: [
            { icon: '🛂', title: '有效护照', desc: '护照有效期距出行日期至少6个月，且至少有1页空白签证页', tag: '必需', tagClass: 'required' },
            { icon: '📸', title: '近期证件照', desc: '6个月内拍摄的护照规格照片（3.5×4.5cm），白色背景', tag: '必需', tagClass: 'required' },
            { icon: '🏠', title: '当前居住地证明', desc: '驾照、银行对账单、住址证明等，证明您当前不在泰国境内', tag: '必需', tagClass: 'required' },
            { icon: '💰', title: '资金证明', desc: '个人银行账户余额不低于50万泰铢（约11万人民币），余额需保持至少3个月', tag: '必需', tagClass: 'required' },
            { icon: '📋', title: '出入境记录', desc: '提交申请日前至少一年的出入境记录', tag: '必需', tagClass: 'required' },
            { icon: '💼', title: '职业/活动证明', desc: '远程工作者：境外雇主的雇佣合同\n自由职业者：专业作品集\n软实力活动：机构确认函', tag: '必需', tagClass: 'required' },
            { icon: '🏨', title: '住宿预订证明', desc: '至少7天的初始住宿预订（酒店预订确认单或房屋租赁合同）', tag: '建议准备', tagClass: 'recommended' },
            { icon: '🏥', title: '医疗保险', desc: '覆盖泰国的旅行保险，保额不低于5万美元', tag: '强烈建议', tagClass: 'recommended' },
            { icon: '✈️', title: '行程规划', desc: '旅行计划说明：赴泰目的、停留安排、工作/活动详情', tag: '建议准备', tagClass: 'recommended' }
        ],

        // --- Process ---
        process_title: '办理流程',
        process_subtitle: 'DTV签证可通过泰国电子签证官网在线申请，或前往泰国驻外使领馆现场办理',
        process_steps: [
            { title: '📝 注册电子签证账户', desc: '访问泰国官方电子签证网站 thaievisa.go.th，创建个人账户并完成注册。' },
            { title: '📑 选择签证类型', desc: '在签证类型中选择 "Destination Thailand Visa (DTV)"，按您的类别选择访问目的。' },
            { title: '✍️ 填写申请信息', desc: '仔细填写个人信息，确保所有信息与护照完全一致。填写错误可能导致申请被拒且费用不退。' },
            { title: '📤 上传所需文件', desc: '按要求上传所有必需文件，文件需清晰可读，建议使用PDF或高清图片格式。' },
            { title: '💳 支付签证费用', desc: '在线支付签证申请费 10,000泰铢（约2,300人民币）。无论是否通过，费用不退。' },
            { title: '⏳ 等待审核', desc: '通常需要 5-15个工作日。建议至少在计划出行前2周提交申请。' },
            { title: '✅ 获取电子签证', desc: '审核通过后收到电子签证批准信。打印携带入境泰国。恭喜！🎉' }
        ],

        // --- Fees ---
        fees_title: '费用明细',
        fees_subtitle: '以下为DTV签证相关的费用参考，实际金额可能因使领馆而异',
        fee_card1_title: '签证申请费',
        fee_card1_amount: '¥2,300',
        fee_card1_unit: '/ 10,000泰铢',
        fee_card1_items: ['一次申请，5年有效', '在线申请可信用卡支付', '申请不通过不予退费', '不同使馆费用可能略有差异'],
        fee_card2_title: '境内延期费',
        fee_card2_amount: '¥400',
        fee_card2_unit: '/ 1,900泰铢',
        fee_card2_items: ['每次入境可延期一次', '延期180天', '在泰国移民局办理', '需在初始180天到期前申请'],
        fee_card3_title: '其他费用参考',
        fee_card3_amount: '预算',
        fee_card3_unit: '参考',
        fee_card3_items: ['医疗保险：约¥500-2,000/年', '90天报到：免费', '银行存款证明开具费：因行而异', '文件翻译公证费：约¥200-500/份'],

        // --- Cases ---
        cases_title: '📚 教程案例',
        cases_subtitle: '来自YouTube、X(Twitter)和小红书的30+真实申请案例和经验分享',
        filter_all: '全部',
        filter_youtube: 'YouTube',
        filter_x: 'X / Twitter',
        filter_xiaohongshu: '小红书',
        cases_search_placeholder: '搜索案例关键词...',
        case_view: '查看详情 →',

        // --- Notes ---
        notes_title: '重要注意事项',
        notes_subtitle: '在申请和使用DTV签证前，请务必了解以下关键信息',
        note_items: [
            { icon: '⚠️', text: '<strong>仅限境外申请：</strong>DTV签证只能在泰国境外申请，无法在泰国境内转换或申请。' },
            { icon: '🚫', text: '<strong>禁止本地就业：</strong>DTV签证持有者不得为泰国公司工作、不得获得泰国工作许可证。' },
            { icon: '📅', text: '<strong>90天报告：</strong>连续停留超过90天需向移民局报告，可在线完成。' },
            { icon: '💡', text: '<strong>无需再入境许可：</strong>DTV作为多次入境签证，出入泰国无需额外申请再入境许可。' },
            { icon: '💰', text: '<strong>税务提示：</strong>停留不超过180天/年，海外收入通常不需缴纳泰国所得税。' },
            { icon: '📝', text: '<strong>申请被拒风险：</strong>表格错误、材料不全可能导致被拒且费用不退。' },
            { icon: '🏫', text: '<strong>2025年更新：</strong>语言学校不再被接受为"软实力"活动类别。' },
            { icon: '💵', text: '<strong>资金要求：</strong>50万泰铢需存在个人储蓄/活期账户，投资、公司、加密货币账户不被接受。' }
        ],

        // --- FAQ ---
        faq_title: '常见问题解答',
        faq_subtitle: '以下整理了关于DTV签证最常被问到的问题',
        faq_items: [
            { q: 'DTV签证和普通旅游签证有什么区别？', a: 'DTV签证有效期5年，允许多次入境，每次可停留180天并可延期；明确允许为海外雇主远程工作；可携带配偶和子女。旅游签通常60天，不允许工作。' },
            { q: '可以在泰国境内申请DTV签证吗？', a: '不可以。DTV签证只能在泰国境外申请，需先离开泰国后再从境外申请。' },
            { q: '50万泰铢的资金要求怎么满足？', a: '个人储蓄/活期账户余额不低于50万泰铢（约11万人民币），保持3-6个月，提供近6个月银行流水。投资、公司、加密货币资产不被接受。' },
            { q: '自由职业者如何证明工作身份？', a: '提供专业作品集：个人网站、客户合同（非泰国公司）、收入流水、LinkedIn页面、资质证书等。' },
            { q: '180天到期后如何延期？', a: '在180天到期前前往泰国移民局申请延期一次，获额外180天，费用1,900泰铢。延期到期后需离境再入境。' },
            { q: 'DTV签证审批需要多长时间？', a: '因地点而异：邻近国家约1周，中国大陆、欧美约2-4周。建议提前2-4周提交申请。' },
            { q: '中国公民从哪里申请最方便？', a: '可通过thaievisa.go.th在线申请，或前往北京、上海、广州、成都、昆明、南宁、厦门、西安、青岛的泰国使领馆，费用约2,300人民币。' },
            { q: 'DTV签证持有者可以在泰国开公司吗？', a: '不可以。DTV不授予工作许可证，不可注册公司或为泰国公司工作。需考虑BOI签证或商务签证。' },
            { q: '什么是90天报告？', a: '连续停留超90天需每90天向移民局报告居住地址。可在线(immigration.go.th)、邮寄或现场办理。未报告罚款2,000泰铢。' },
            { q: 'DTV签证被拒的常见原因？', a: '资金不足、职业证明不充分、信息填写错误、有逾期记录、材料翻译不规范、提供虚假信息等。' }
        ],

        // --- Comments ---
        comments_title: '💬 用户留言',
        comments_subtitle: '分享您的DTV签证申请经验或提出问题，帮助更多人',
        comment_login_prompt: '请先 <a href="#" onclick="showModal(\'login\')">登录</a> 或 <a href="#" onclick="showModal(\'register\')">注册</a> 后发表留言',
        comment_placeholder: '写下您的留言、问题或经验分享...',
        comment_submit: '发表留言',
        comment_empty: '暂无留言，快来发表第一条吧！',
        comment_reply: '回复',

        // --- CTA ---
        cta_title_1: '准备好开始申请了吗？',
        cta_title_2: '开启您的泰国之旅 🌴',
        cta_desc: '前往泰国官方电子签证网站，开始您的DTV签证申请之旅',
        cta_btn_official: '🌐 泰国电子签证官网',
        cta_btn_top: '⬆️ 回到顶部',

        // --- Footer ---
        footer_brand_desc: '为中文用户提供最全面、最准确的泰国DTV签证办理信息。',
        footer_nav_title: '快速导航',
        footer_more_title: '更多',
        footer_official_title: '官方资源',
        footer_official_evisa: '泰国电子签证系统',
        footer_official_mfa: '泰国外交部',
        footer_official_imm: '泰国移民局',
        footer_disclaimer: '<strong>免责声明：</strong>本网站提供的信息仅供参考，不构成法律或签证建议。签证政策可能随时变动，请以泰国驻外使领馆和泰国移民局的最新官方信息为准。',
        footer_copyright: '© 2024-2025 DTV签证指南 | 信息更新至2025年3月',
        footer_note: '本站内容仅供参考 · 不代表官方立场',

        // --- Auth Modals ---
        modal_login_title: '🔑 用户登录',
        modal_login_input: '用户名或邮箱',
        modal_login_password: '密码',
        modal_login_submit: '登录',
        modal_login_switch: '没有账号？',
        modal_login_switch_link: '立即注册',
        modal_register_title: '📝 用户注册',
        modal_register_username: '用户名',
        modal_register_email: '邮箱',
        modal_register_password: '密码 (至少6位)',
        modal_register_submit: '注册',
        modal_register_switch: '已有账号？',
        modal_register_switch_link: '去登录',
        btn_logout: '退出',
        user_greeting_prefix: '👋 ',

        // --- Language ---
        lang_label: '中文',
    },

    en: {
        // --- Nav ---
        nav_logo_text: 'DTV Visa Guide',
        nav_overview: 'Overview',
        nav_eligibility: 'Eligibility',
        nav_documents: 'Documents',
        nav_process: 'Process',
        nav_fees: 'Fees',
        nav_cases: 'Tutorials',
        nav_faq: 'FAQ',
        nav_comments: 'Comments',
        btn_login: 'Login',
        btn_register: 'Register',

        // --- Hero ---
        hero_badge: '2024-2025 Latest Policy',
        hero_title_1: 'Thailand ',
        hero_title_highlight: 'DTV Visa',
        hero_title_2: 'Complete Guide',
        hero_desc: 'The Destination Thailand Visa (DTV), launched in July 2024, is a brand-new 5-year multiple-entry visa designed for digital nomads, remote workers, and Thai culture enthusiasts. Each stay can be up to 180 days.',
        search_placeholder: 'Search DTV visa knowledge base... e.g. deposit, extension, soft power',
        stat_validity: '5 Years',
        stat_validity_label: 'Visa Validity',
        stat_stay: '180 Days',
        stat_stay_label: 'Per Entry Stay',
        stat_entry: 'Multiple Entry',
        stat_entry_label: 'Unlimited Entries',
        stat_fee: '≈ $280',
        stat_fee_label: 'Application Fee',
        cta_process: '📋 Application Process',
        cta_cases: '🎬 Tutorials',

        // --- Overview ---
        overview_title: 'What is the DTV Visa?',
        overview_subtitle: 'The Destination Thailand Visa is an innovative visa type introduced by the Thai government to attract global talent and cultural exchange',
        overview_card1_title: '5-Year Multiple Entry',
        overview_card1_desc: 'The DTV visa is valid for 5 years, allowing unlimited entries to Thailand without reapplying each time.',
        overview_card2_title: 'Legal Remote Work',
        overview_card2_desc: 'DTV holders may work remotely for overseas employers in Thailand, but cannot be employed by Thai companies or invoice Thai clients.',
        overview_card3_title: 'Up to ~1 Year Stay',
        overview_card3_desc: 'Each entry allows 180 days, extendable once for another 180 days. After that, you must exit and re-enter.',
        overview_card4_title: 'Bring Your Family',
        overview_card4_desc: 'Legal spouses and children under 20 can apply as dependents with proper documentation.',

        // --- Eligibility ---
        elig_title: 'Who Can Apply for a DTV Visa?',
        elig_subtitle: 'The DTV visa targets three main groups. Applicants must be at least 20 years old with no Thai visa overstay records',
        elig_cat1_title: 'Digital Nomads / Remote Workers',
        elig_cat1_items: [
            'Digital nomads working remotely for non-Thai employers',
            'Remote workers with overseas employment contracts',
            'Freelancers, independent consultants, content creators',
            'Foreign professionals with specialized skills',
            'Must provide employment contract or professional portfolio'
        ],
        elig_cat2_title: 'Thai "Soft Power" Activity Participants',
        elig_cat2_items: [
            'Muay Thai training courses',
            'Thai cooking courses',
            'Sports training and related activities',
            'Healthcare and wellness programs',
            'Music festivals, art exhibitions, seminars',
            '⚠️ Language schools no longer accepted since 2025',
            'Recommended activity duration of at least 6 months'
        ],
        elig_cat3_title: 'Accompanying Family Members',
        elig_cat3_items: [
            'Legal spouse of the DTV visa holder',
            'Children under 20 (including adopted children)',
            'Must provide marriage/birth/adoption certificates',
            'Must provide passport and DTV visa page copies of the primary applicant',
            'Must provide financial proof of the primary applicant'
        ],

        // --- Documents ---
        docs_title: 'Required Documents',
        docs_subtitle: 'Please carefully prepare the following documents before applying. All files must be in English or Thai; other languages require official translation',
        doc_items: [
            { icon: '🛂', title: 'Valid Passport', desc: 'Passport valid for at least 6 months from travel date with at least 1 blank visa page', tag: 'Required', tagClass: 'required' },
            { icon: '📸', title: 'Recent Photo', desc: 'Passport-sized photo (3.5×4.5cm) taken within 6 months, white background', tag: 'Required', tagClass: 'required' },
            { icon: '🏠', title: 'Proof of Residence', desc: 'Driver\'s license, bank statement, or address proof showing you are currently outside Thailand', tag: 'Required', tagClass: 'required' },
            { icon: '💰', title: 'Financial Proof', desc: 'Personal bank account balance of at least 500,000 THB (~$15,000), maintained for at least 3 months', tag: 'Required', tagClass: 'required' },
            { icon: '📋', title: 'Travel History', desc: 'Entry/exit records for at least one year prior to application', tag: 'Required', tagClass: 'required' },
            { icon: '💼', title: 'Employment/Activity Proof', desc: 'Remote workers: overseas employment contract\nFreelancers: professional portfolio\nSoft power: institution confirmation letter', tag: 'Required', tagClass: 'required' },
            { icon: '🏨', title: 'Accommodation Booking', desc: 'At least 7 days of initial accommodation booking (hotel confirmation or rental agreement)', tag: 'Recommended', tagClass: 'recommended' },
            { icon: '🏥', title: 'Medical Insurance', desc: 'Travel insurance covering Thailand with minimum coverage of $50,000', tag: 'Recommended', tagClass: 'recommended' },
            { icon: '✈️', title: 'Travel Itinerary', desc: 'Travel plan: purpose of visit, accommodation arrangements, work/activity details', tag: 'Recommended', tagClass: 'recommended' }
        ],

        // --- Process ---
        process_title: 'Application Process',
        process_subtitle: 'The DTV visa can be applied online through the Thai e-Visa website or at a Thai embassy/consulate',
        process_steps: [
            { title: '📝 Register e-Visa Account', desc: 'Visit the official Thai e-Visa website at thaievisa.go.th and create your personal account.' },
            { title: '📑 Select Visa Type', desc: 'Choose "Destination Thailand Visa (DTV)" and select the purpose of visit matching your category.' },
            { title: '✍️ Fill in Application', desc: 'Carefully fill in personal information. Ensure all details match your passport exactly. Errors may lead to rejection without refund.' },
            { title: '📤 Upload Documents', desc: 'Upload all required documents clearly readable. PDF or high-resolution image formats are recommended.' },
            { title: '💳 Pay Visa Fee', desc: 'Pay the visa application fee of 10,000 THB (~$280) online. Fee is non-refundable regardless of outcome.' },
            { title: '⏳ Wait for Review', desc: 'Processing typically takes 5-15 business days. Apply at least 2 weeks before your planned travel date.' },
            { title: '✅ Receive e-Visa', desc: 'Upon approval, you\'ll receive an e-Visa approval letter. Print and carry it when entering Thailand. Congratulations! 🎉' }
        ],

        // --- Fees ---
        fees_title: 'Fee Breakdown',
        fees_subtitle: 'Below are DTV visa-related fees for reference. Actual amounts may vary by embassy/consulate',
        fee_card1_title: 'Application Fee',
        fee_card1_amount: '$280',
        fee_card1_unit: '/ 10,000 THB',
        fee_card1_items: ['One application, 5-year validity', 'Online payment by credit card', 'Non-refundable if rejected', 'May vary slightly by embassy'],
        fee_card2_title: 'Extension Fee',
        fee_card2_amount: '$55',
        fee_card2_unit: '/ 1,900 THB',
        fee_card2_items: ['One extension per entry', 'Extends by 180 days', 'Processed at Thai Immigration', 'Must apply before initial 180 days expire'],
        fee_card3_title: 'Other Costs',
        fee_card3_amount: 'Budget',
        fee_card3_unit: 'Reference',
        fee_card3_items: ['Medical insurance: ~$70-280/year', '90-day reporting: Free', 'Bank statement fee: Varies', 'Document translation: ~$30-70/doc'],

        // --- Cases ---
        cases_title: '📚 Tutorials & Cases',
        cases_subtitle: '30+ real application cases and experience sharing from YouTube, X (Twitter) and Xiaohongshu',
        filter_all: 'All',
        filter_youtube: 'YouTube',
        filter_x: 'X / Twitter',
        filter_xiaohongshu: 'Xiaohongshu',
        cases_search_placeholder: 'Search tutorials...',
        case_view: 'View Details →',

        // --- Notes ---
        notes_title: 'Important Notes',
        notes_subtitle: 'Before applying for and using the DTV visa, please be sure to understand the following key information',
        note_items: [
            { icon: '⚠️', text: '<strong>Offshore Application Only:</strong> DTV visa can only be applied for outside Thailand. It cannot be converted or applied for within Thailand.' },
            { icon: '🚫', text: '<strong>No Local Employment:</strong> DTV holders may not work for Thai companies or obtain a Thai work permit.' },
            { icon: '📅', text: '<strong>90-Day Reporting:</strong> If staying continuously for over 90 days, you must report to Immigration. Can be done online.' },
            { icon: '💡', text: '<strong>No Re-entry Permit Needed:</strong> As a multiple-entry visa, no separate re-entry permit is required.' },
            { icon: '💰', text: '<strong>Tax Notice:</strong> If staying no more than 180 days/year, overseas income is generally not subject to Thai income tax.' },
            { icon: '📝', text: '<strong>Rejection Risk:</strong> Form errors or incomplete documents may lead to rejection with no fee refund.' },
            { icon: '🏫', text: '<strong>2025 Update:</strong> Language schools are no longer accepted as a "soft power" activity category.' },
            { icon: '💵', text: '<strong>Fund Requirements:</strong> 500,000 THB must be in a personal savings/checking account. Investment, corporate, or crypto accounts are not accepted.' }
        ],

        // --- FAQ ---
        faq_title: 'Frequently Asked Questions',
        faq_subtitle: 'The most commonly asked questions about the DTV visa are answered below',
        faq_items: [
            { q: 'How does the DTV visa differ from a regular tourist visa?', a: 'The DTV visa is valid for 5 years with multiple entries, allows 180-day stays with extensions, permits remote work for overseas employers, and allows family members. Tourist visas are typically 60 days with no work allowed.' },
            { q: 'Can I apply for a DTV visa inside Thailand?', a: 'No. The DTV visa can only be applied for outside Thailand. You must leave Thailand first before applying from abroad.' },
            { q: 'How can I meet the 500,000 THB financial requirement?', a: 'Maintain at least 500,000 THB (~$15,000) in a personal savings/checking account for 3-6 months. Provide 6 months of bank statements. Investment, corporate, and cryptocurrency assets are not accepted.' },
            { q: 'How can freelancers prove their work status?', a: 'Provide a professional portfolio: personal website, client contracts (non-Thai companies), income records, LinkedIn profile, relevant certifications.' },
            { q: 'How to extend after the 180-day stay?', a: 'Visit Thai Immigration before the 180 days expire to apply for a one-time extension of 180 days. The fee is 1,900 THB. After the extension expires, you must exit and re-enter.' },
            { q: 'How long does DTV visa processing take?', a: 'Varies by location: about 1 week from nearby countries, 2-4 weeks from China, Europe, or the Americas. Apply at least 2-4 weeks in advance.' },
            { q: 'Where should Chinese citizens apply?', a: 'Apply online at thaievisa.go.th, or visit Thai embassies/consulates in Beijing, Shanghai, Guangzhou, Chengdu, Kunming, Nanning, Xiamen, Xi\'an, Qingdao. Fee is approximately ¥2,300.' },
            { q: 'Can DTV visa holders start a company in Thailand?', a: 'No. The DTV does not grant a work permit. You cannot register a company or work for Thai companies. Consider a BOI visa or business visa instead.' },
            { q: 'What is the 90-day report?', a: 'If staying continuously for more than 90 days, you must report your address to Immigration every 90 days. Can be done online (immigration.go.th), by mail, or in person. Failure to report results in a 2,000 THB fine.' },
            { q: 'Common reasons for DTV visa rejection?', a: 'Insufficient funds, inadequate professional proof, form errors, overstay records, improperly translated documents, providing false information.' }
        ],

        // --- Comments ---
        comments_title: '💬 User Comments',
        comments_subtitle: 'Share your DTV visa application experience or ask questions to help others',
        comment_login_prompt: 'Please <a href="#" onclick="showModal(\'login\')">login</a> or <a href="#" onclick="showModal(\'register\')">register</a> to post a comment',
        comment_placeholder: 'Write your comment, question, or share your experience...',
        comment_submit: 'Post Comment',
        comment_empty: 'No comments yet. Be the first to post!',
        comment_reply: 'Reply',

        // --- CTA ---
        cta_title_1: 'Ready to Apply?',
        cta_title_2: 'Start Your Thailand Journey 🌴',
        cta_desc: 'Visit the official Thai e-Visa website to begin your DTV visa application',
        cta_btn_official: '🌐 Thai e-Visa Official Site',
        cta_btn_top: '⬆️ Back to Top',

        // --- Footer ---
        footer_brand_desc: 'Providing the most comprehensive and accurate Thailand DTV visa information.',
        footer_nav_title: 'Quick Nav',
        footer_more_title: 'More',
        footer_official_title: 'Official Resources',
        footer_official_evisa: 'Thai e-Visa System',
        footer_official_mfa: 'Thai Ministry of Foreign Affairs',
        footer_official_imm: 'Thai Immigration Bureau',
        footer_disclaimer: '<strong>Disclaimer:</strong> Information on this website is for reference only and does not constitute legal or visa advice. Visa policies may change at any time. Please refer to the latest official information from Thai embassies/consulates and Thai Immigration Bureau.',
        footer_copyright: '© 2024-2025 DTV Visa Guide | Updated March 2025',
        footer_note: 'For reference only · Not an official source',

        // --- Auth Modals ---
        modal_login_title: '🔑 User Login',
        modal_login_input: 'Username or Email',
        modal_login_password: 'Password',
        modal_login_submit: 'Login',
        modal_login_switch: 'No account?',
        modal_login_switch_link: 'Register Now',
        modal_register_title: '📝 User Registration',
        modal_register_username: 'Username',
        modal_register_email: 'Email',
        modal_register_password: 'Password (min 6 chars)',
        modal_register_submit: 'Register',
        modal_register_switch: 'Already have an account?',
        modal_register_switch_link: 'Login',
        btn_logout: 'Logout',
        user_greeting_prefix: '👋 ',

        // --- Language ---
        lang_label: 'EN',
    }
};

// ========================================
// Case title translations (zh -> en)
// ========================================
const caseTranslations = {
    'DTV签证完整申请教程 - 2025最新版': { title: 'Complete DTV Visa Application Tutorial - 2025 Edition', desc: 'Step-by-step guide from e-Visa account registration to approval, including document checklist and common mistakes.' },
    '我如何在一周内获批泰国5年DTV签证': { title: 'How I Got My 5-Year DTV Visa Approved in One Week', desc: 'Sharing the complete journey from document preparation to approval, including which embassy is most efficient.' },
    '数字游民的DTV签证申请：自由职业者篇': { title: 'DTV Visa for Digital Nomads: Freelancer Guide', desc: 'Detailed guide on how freelancers can prepare their portfolio and income proof for the DTV visa application.' },
    'DTV签证 vs 其他泰国签证对比分析': { title: 'DTV Visa vs Other Thai Visas: Comparison Analysis', desc: 'Detailed comparison of DTV visa with tourist, business, and Elite visas to help you choose the best option.' },
    '通过泰拳课程申请DTV签证的完整经验': { title: 'Getting DTV Visa Through Muay Thai: Complete Experience', desc: 'Experience sharing of applying for DTV visa through the "soft power" route by enrolling in Muay Thai courses.' },
    'DTV签证财务证明深度解析': { title: 'DTV Visa Financial Requirements: In-Depth Analysis', desc: 'Detailed explanation of the 500,000 THB fund requirement and how to prepare bank statements.' },
    '在柬埔寨申请泰国DTV签证的经验': { title: 'Applying for Thai DTV Visa from Cambodia', desc: 'Strategy sharing on applying for DTV visa from a third country, with Cambodia embassy process and timeline.' },
    'DTV签证被拒后如何重新申请': { title: 'How to Reapply After DTV Visa Rejection', desc: 'Analyzing common rejection reasons and sharing strategies for a successful second application.' },
    'DTV签证入境泰国后的生活指南': { title: 'Life Guide After Entering Thailand with DTV Visa', desc: 'Important notes after entry, 90-day reporting, extension process, and daily life arrangements.' },
    '带家人一起申请DTV签证的经验': { title: 'Applying for DTV Visa with Family', desc: 'Complete guide for a family of three applying for DTV visa, including spouse and children document preparation.' },
    '远程工程师的DTV签证申请日记': { title: 'DTV Visa Application Diary of a Remote Engineer', desc: 'A software engineer sharing the complete DTV visa application process on X, from preparation to approval timeline.' },
    'DTV签证2025年新政策更新速递': { title: 'DTV Visa 2025 Policy Updates', desc: 'Follow Thai visa policy changes and get the latest 2025 DTV visa adjustments first.' },
    '从香港申请DTV签证的实战分享': { title: 'Applying for DTV Visa from Hong Kong', desc: 'Specific process and experience sharing of applying at the Thai Consulate in Hong Kong.' },
    '设计师申请DTV签证的作品集准备': { title: 'Designer\'s Portfolio Preparation for DTV Visa', desc: 'From a designer\'s perspective on how to prepare a convincing freelancer portfolio.' },
    'DTV签证持有者的泰国银行开户攻略': { title: 'Thai Bank Account Opening Guide for DTV Holders', desc: 'Experience and tips for opening a bank account in Thailand after obtaining the DTV visa.' },
    '泰国DTV签证税务问题详解': { title: 'DTV Visa Tax Issues Explained', desc: 'Sharing tax obligations and compliance advice for DTV visa holders in Thailand.' },
    'DTV签证线上申请系统避坑指南': { title: 'DTV Visa Online Application System: Pitfall Guide', desc: 'Summary of common mistakes and system operation tips for the online application.' },
    'DTV签证社群推荐和互助资源': { title: 'DTV Visa Community & Mutual Aid Resources', desc: 'Recommended Facebook groups, Telegram channels, and other DTV visa applicant communities.' },
    '通过烹饪课程申请DTV签证的经历': { title: 'DTV Visa Through Thai Cooking Course', desc: 'Case sharing of applying for DTV visa using Thai cooking as a "soft power" activity.' },
    'DTV签证180天延期的详细流程': { title: 'DTV Visa 180-Day Extension: Detailed Process', desc: 'Complete process, required documents, and tips for the 180-day extension within Thailand.' },
    '小红书达人分享：DTV签证DIY申请全攻略': { title: 'Xiaohongshu Creator: DIY DTV Visa Application Guide', desc: 'Super detailed step-by-step tutorial from document preparation to online form filling, with template downloads.' },
    '程序员在泰国远程办公：DTV签证申请记': { title: 'Programmer Remote Working in Thailand: DTV Visa Story', desc: 'An IT professional sharing how to use a remote work contract to apply for the DTV visa.' },
    '闺蜜团一起申请DTV签证的故事': { title: 'Best Friends Applying for DTV Visa Together', desc: 'Story of three friends applying for DTV visa together and starting a new life in Thailand.' },
    'DTV签证存款证明怎么开？银行柜台实拍': { title: 'How to Get Bank Statement for DTV Visa? Real Bank Visit', desc: 'Real footage of getting a bank statement equivalent to 500,000 THB at a local bank.' },
    '被拒签后的DTV二签成功经验': { title: 'Successful Second DTV Application After Rejection', desc: 'The journey and key improvements after being rejected due to incomplete documents.' },
    '在昆明泰国领事馆申请DTV签证攻略': { title: 'DTV Visa at Thai Consulate in Kunming', desc: 'Process and window guide for applying at the Thai Consulate General in Kunming.' },
    '自由撰稿人的DTV签证申请心得': { title: 'Freelance Writer\'s DTV Visa Application Tips', desc: 'How freelance writers/content creators can prepare professional proof and income documents.' },
    '带娃申请DTV签证：一家人的泰国梦': { title: 'DTV Visa with Kids: A Family\'s Thailand Dream', desc: 'Complete process for a family of four, including special document requirements for children.' },
    'DTV签证 vs 泰国精英签：哪个更划算？': { title: 'DTV Visa vs Thailand Elite Visa: Which is Better?', desc: 'Multi-dimensional comparison of DTV and Elite visas in terms of cost, convenience, and benefits.' },
    '在清迈生活半年：DTV签证持有者的真实体验': { title: 'Living in Chiang Mai for 6 Months: A DTV Holder\'s Real Experience', desc: 'Real feelings of living in Chiang Mai with a DTV visa, including housing, transportation, and food recommendations.' }
};

// ========================================
// Core i18n Functions
// ========================================
function getLang() {
    return localStorage.getItem('dtv-lang') || 'zh';
}

function setLang(lang) {
    localStorage.setItem('dtv-lang', lang);
    translatePage();
}

function t(key) {
    const lang = getLang();
    return translations[lang]?.[key] ?? translations['zh']?.[key] ?? key;
}

function translatePage() {
    const lang = getLang();
    const dict = translations[lang] || translations['zh'];

    // Translate all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] !== undefined) {
            if (typeof dict[key] === 'string') {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = dict[key];
                } else if (key.includes('disclaimer') || key.includes('login_prompt') || key.includes('note_')) {
                    el.innerHTML = dict[key];
                } else {
                    el.textContent = dict[key];
                }
            }
        }
    });

    // Translate data-i18n-html (for HTML content)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (dict[key] !== undefined) {
            el.innerHTML = dict[key];
        }
    });

    // Update html lang attribute
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    // Update language switcher button text
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.textContent = lang === 'zh' ? '🌐 EN' : '🌐 中文';
    }

    // Rebuild dynamic sections
    buildEligibility(lang);
    buildDocuments(lang);
    buildProcess(lang);
    buildFees(lang);
    buildNotes(lang);
    buildFAQ(lang);

    // Reload dynamic data with translations
    if (typeof loadCases === 'function') loadCases();
    if (typeof loadComments === 'function') loadComments();
}

// ========================================
// Dynamic Section Builders
// ========================================
function buildEligibility(lang) {
    const d = translations[lang];
    const container = document.getElementById('elig-cards');
    if (!container) return;
    const cats = [
        { title: d.elig_cat1_title, items: d.elig_cat1_items, iconClass: 'nomad', icon: '💻' },
        { title: d.elig_cat2_title, items: d.elig_cat2_items, iconClass: 'culture', icon: '🥊' },
        { title: d.elig_cat3_title, items: d.elig_cat3_items, iconClass: 'family', icon: '👨‍👩‍👧‍👦' }
    ];
    container.innerHTML = cats.map((c, i) => `
    <div class="eligibility-card reveal reveal-delay-${i + 1} visible">
      <div class="eligibility-header">
        <div class="eligibility-icon ${c.iconClass}">${c.icon}</div>
        <h3>${c.title}</h3>
      </div>
      <ul>${c.items.map(it => `<li>${it}</li>`).join('')}</ul>
    </div>
    `).join('');
}

function buildDocuments(lang) {
    const d = translations[lang];
    const container = document.getElementById('docs-grid');
    if (!container) return;
    container.innerHTML = d.doc_items.map(item => `
    <div class="doc-item reveal visible">
      <div class="doc-icon">${item.icon}</div>
      <div class="doc-info">
        <h4>${item.title}</h4>
        <p>${item.desc.replace(/\n/g, '<br>')}</p>
        <span class="doc-tag ${item.tagClass}">${item.tag}</span>
      </div>
    </div>
    `).join('');
}

function buildProcess(lang) {
    const d = translations[lang];
    const container = document.getElementById('process-timeline');
    if (!container) return;
    container.innerHTML = d.process_steps.map((step, i) => `
    <div class="timeline-item reveal visible">
      <div class="timeline-number">${i + 1}</div>
      <div class="timeline-content">
        <h4>${step.title}</h4>
        <p>${step.desc}</p>
      </div>
    </div>
    `).join('');
}

function buildFees(lang) {
    const d = translations[lang];
    const cards = [
        { title: d.fee_card1_title, amount: d.fee_card1_amount, unit: d.fee_card1_unit, items: d.fee_card1_items, icon: '📋', featured: false },
        { title: d.fee_card2_title, amount: d.fee_card2_amount, unit: d.fee_card2_unit, items: d.fee_card2_items, icon: '📅', featured: true },
        { title: d.fee_card3_title, amount: d.fee_card3_amount, unit: d.fee_card3_unit, items: d.fee_card3_items, icon: '💡', featured: false }
    ];
    const container = document.getElementById('fees-grid');
    if (!container) return;
    container.innerHTML = cards.map(c => `
    <div class="fee-card ${c.featured ? 'featured' : ''} reveal visible">
      <div class="fee-icon">${c.icon}</div>
      <h3>${c.title}</h3>
      <div class="fee-amount">${c.amount} <small>${c.unit}</small></div>
      <ul class="fee-details">${c.items.map(it => `<li>${it}</li>`).join('')}</ul>
    </div>
    `).join('');
}

function buildNotes(lang) {
    const d = translations[lang];
    const container = document.getElementById('notes-container');
    if (!container) return;
    container.innerHTML = d.note_items.map(n => `
    <div class="note-card reveal visible">
      <span class="note-icon">${n.icon}</span>
      <p>${n.text}</p>
    </div>
    `).join('');
}

function buildFAQ(lang) {
    const d = translations[lang];
    const container = document.getElementById('faq-container');
    if (!container) return;
    container.innerHTML = d.faq_items.map(f => `
    <div class="faq-item reveal visible">
      <button class="faq-question">${f.q}<span class="faq-arrow">▼</span></button>
      <div class="faq-answer">
        <div class="faq-answer-inner">${f.a}</div>
      </div>
    </div>
    `).join('');
    // Re-bind FAQ accordion
    if (typeof initFAQ === 'function') initFAQ();
}

// Case translation helper
function translateCase(caseItem) {
    const lang = getLang();
    if (lang === 'zh') return caseItem;
    const tr = caseTranslations[caseItem.title];
    if (tr) {
        return { ...caseItem, title: tr.title, description: tr.desc };
    }
    return caseItem;
}

// Toggle language
function toggleLang() {
    const current = getLang();
    setLang(current === 'zh' ? 'en' : 'zh');
}
