import DATES from "@/constants/dates"
import FORMATS from "@/constants/formats"
import { earn_platforms, spend_platforms } from "@/platforms"


const StatsSummaryCard = () => import("@/components/widgets/StatsSummaryCard")
const PanelSummaryCard = () => import("@/components/widgets/PanelSummaryCard")
const MainChart = () => import("@/components/widgets/MainChart")
const BaseTable = () => import("@/components/widgets/BaseTable")
const PerformanceTable = () => import("@/components/widgets/PerformanceTable")
const PlatformsSpendTable = () => import("@/components/widgets/PlatformsSpendTable")
const PlatformsEarnTable = () => import("@/components/widgets/PlatformsEarnTable")

const FacebookAdsSpendTable = () => import("@/facebook_ads/widgets/spendTable")
const GoogleAdsSpendTable = () => import("@/google_ads/widgets/spendTable")

const GoogleAdsenseEarnTable = () => import("@/google_adsense/widgets/earnTable")
const MonetizzeEarnTable = () => import("@/monetizze/widgets/earnTable")
const HotmartEarnTable = () => import("@/hotmart/widgets/earnTable")

const widgets = [
  /* Summary Fixed Date Periods */
  {
    "id": "summary_today",
    "compare_id": "summary_yesterday",
    "name": "Resumo hoje.",
    "description": "Rendimento e ROI hoje, comparado com ontem.",
    "label": "1D",
    "img": "/img/widgets/summary_today.png",
    "type": "summary",
    "typeName": "Sumário",
    "widthUnits": 3,
    "minWidth": 2,
    "heightUnits": 1,
    "minHeight": 1,
    "component": StatsSummaryCard,
    "rules": {
      "spend_and_earn_platform": true
    },
    "dates": [DATES.today.format(FORMATS.date)],
    "compareDates": [DATES.yesterday.format(FORMATS.date)]
  },
  {
    "id": "summary_last_7days",
    "compare_id": "summary_before_last_7days",
    "name": "Resumo últimos 7 dias",
    "description": "Rendimento e ROI nos últimos 7 dias, comparado aos 7 anteriores.",
    "label": "7D",
    "img": "/img/widgets/summary_last_7days.png",
    "type": "summary",
    "typeName": "Sumário",
    "widthUnits": 3,
    "minWidth": 2,
    "heightUnits": 1,
    "minHeight": 1,
    "component": StatsSummaryCard,
    "rules": {
      "spend_and_earn_platform": true
    },
    "fixedDate": "L7D"
  },
  {
    "id": "summary_last_30days",
    "compare_id": "summary_before_last_30days",
    "name": "Resumo últimos 30 dias",
    "description": "Rendimento e ROI nos últimos 30 dias, comparado aos 30 anteriores.",
    "label": "30D",
    "img": "/img/widgets/summary_last_30days.png",
    "type": "summary",
    "typeName": "Sumário",
    "widthUnits": 3,
    "minWidth": 2,
    "heightUnits": 1,
    "component": StatsSummaryCard,
    "rules": {
      "spend_and_earn_platform": true
    },
    "fixedDate": "L30D"
  },
  {
    "id": "summary_current_month",
    "compare_id": "summary_last_month",
    "name": "Resumo mês atual",
    "description": "Rendimento e ROI no mês atual, comparado ao mês passado na mesma quantidade de dias.",
    "label": "MTD",
    "img": "/img/widgets/summary_current_month.png",
    "type": "summary",
    "typeName": "Sumário",
    "widthUnits": 3,
    "minWidth": 2,
    "heightUnits": 1,
    "component": StatsSummaryCard,
    "rules": {
      "spend_and_earn_platform": true
    },
    "fixedDate": "MTD"
  },

  /* Panel Summary */
  {
    "id": "summary_custom_date",
    "name": "Resumo",
    "description": "Investimento, receita, rendimento e ROI com data personalizada",
    "label": "STAT",
    "img": "/img/widgets/summary_custom_date.png",
    "type": "summary",
    "typeName": "Sumário",
    "widthUnits": 6,
    "minWidth": 4,
    "heightUnits": 3,
    "minHeight": 2.5,
    "component": PanelSummaryCard,
    "rules": {
      "spend_and_earn_platform": true
    },
    "customDate": true
  },

  /* Chart */
  {
    "id": "chart_current_month",
    "compare_id": "chart_last_month",
    "name": "Mês atual vs Mês passado",
    "description": "Rendimento e ROI por dia de cada mês",
    "label": "MTD",
    "img": "/img/widgets/chart_current_month.png",
    "type": "chart",
    "typeName": "Gráfico",
    "widthUnits": 6,
    "heightUnits": 7,
    "component": MainChart,
    "rules": {
      "spend_and_earn_platform": true
    },
    "customDate": true
  },

  /* Spend grouped by platforms */
  {
    "id": "table_spend",
    "name": "Investimentos de todas as plataformas",
    "img": "/img/widgets/table_spend.png",
    "type": "table",
    "typeName": "Tabela",
    "spend_platforms": spend_platforms.map(sp => sp.id),
    "widthUnits": 6,
    "heightUnits": 7,
    "rules": {
      "platforms": spend_platforms.map(sp => sp.id)
    },
    "component": BaseTable,
    "childComponent": PlatformsSpendTable,
    "description": "Investimentos agrupados por plataformas",
    "customDate": true
  },

  /* Earn grouped by platforms */
  {
    "id": "table_earn",
    "name": "Receitas de todas as plataformas",
    "img": "/img/widgets/table_earn.png",
    "type": "table",
    "typeName": "Tabela",
    "earn_platforms": earn_platforms.map(ep => ep.id),
    "widthUnits": 6,
    "heightUnits": 7,
    "rules": {
      "platforms": earn_platforms.map(ep => ep.id)
    },
    "component": BaseTable,
    "childComponent": PlatformsEarnTable,
    "description": "Receitas agrupadas por plataformas",
    "customDate": true
  },

  /* Facebook Ads: Spend grouped by assets */
  {
    "id": "table_spend_facebook_ads",
    "name": "Investimentos do Facebook Ads",
    "img": "/img/widgets/table_spend_facebook_ads.png",
    "type": "table",
    "typeName": "Tabela",
    "spend_platforms": [
      "facebook_ads"
    ],
    "widthUnits": 6,
    "heightUnits": 7,
    "rules": {
      "platforms": ["facebook_ads"]
    },
    "component": BaseTable,
    "childComponent": FacebookAdsSpendTable,
    "customDate": true,
    "description": "Receita por contas, campanhas, conj. de anúncios e anúncios do Facebook Ads"
  },

  /* Google Ads: Spend grouped by assets */
  {
    "id": "table_spend_google_adwords",
    "name": "Investimentos do Google Ads",
    "img": "/img/widgets/table_spend_google_adwords.png",
    "type": "table",
    "typeName": "Tabela",
    "spend_platforms": [
      "google_adwords"
    ],
    "widthUnits": 6,
    "heightUnits": 7,
    "rules": {
      "platforms": ["google_adwords"]
    },
    "component": BaseTable,
    "childComponent": GoogleAdsSpendTable,
    "customDate": true,
    "description": "Receita por contas, campanhas, grupo de anúncios e anúncios do Google Ads"
  },

  /* Monetizze: Earn/Sales grouped by products */
  {
    "id": "table_earn_monetizze",
    "name": "Receita por produto da Monetizze",
    "img": "/img/widgets/table_earn_monetizze.png",
    "type": "table",
    "typeName": "Tabela",
    "earn_platforms": [
      "monetizze"
    ],
    "widthUnits": 6,
    "heightUnits": 7,
    "rules": {
      "platforms": ["monetizze"]
    },
    "component": BaseTable,
    "childComponent": MonetizzeEarnTable,
    "customDate": true,
    "description": "Receita por prodto da Monetizze"
  },

  /* Hotmart: Earn/Sales grouped by products */
  {
    "id": "table_earn_hotmart",
    "name": "Receita por produto da Hotmart",
    "img": "/img/widgets/table_earn_hotmart.png",
    "type": "table",
    "typeName": "Tabela",
    "earn_platforms": [
      "hotmart"
    ],
    "widthUnits": 6,
    "heightUnits": 7,
    "rules": {
      "platforms": ["hotmart"]
    },
    "component": BaseTable,
    "childComponent": HotmartEarnTable,
    "customDate": true,
    "description": "Receita por produto da Hotmart"
  },

  /* Google Adsense: Earn grouped by domains */
  {
    "id": "table_earn_google_adsense",
    "name": "Receitas do Google Adsense",
    "img": "/img/widgets/table_earn_google_adsense.png",
    "type": "table",
    "typeName": "Tabela",
    "earn_platforms": [
      "google_adsense"
    ],
    "widthUnits": 6,
    "heightUnits": 7,
    "rules": {
      "platforms": ["google_adsense"]
    },
    "component": BaseTable,
    "childComponent": GoogleAdsenseEarnTable,
    "customDate": true,
    "description": "Receita por site do Google Adsense"
  },

  /* Earn/spend/performance grouped by URL */
  {
    "id": "table_url_performance",
    "name": "Performance por URL",
    "img": "/img/widgets/table_param_performance.png",
    "type": "table",
    "typeName": "Tabela",
    "earn_platforms": [
      "google_adsense"
    ],
    "spend_platforms": [
      "facebook_ads"
    ],
    "widthUnits": 12,
    "heightUnits": 7,
    "rules": {
      "platforms": ["facebook_ads", "google_adsense"],
      "spend_and_earn_platform": true
    },
    "component": BaseTable,
    "childComponent": PerformanceTable,
    "customDate": true
  },

  /* Earn/spend/performance grouped by Parameters */
  {
    "id": "table_param_performance",
    "name": "Performance por parâmetro de URL",
    "img": "/img/widgets/table_param_performance.png",
    "type": "table",
    "typeName": "Tabela",
    "earn_platforms": [
      "monetizze",
      "hotmart"
    ],
    "spend_platforms": [
      "facebook_ads"
    ],
    "widthUnits": 12,
    "heightUnits": 7,
    "rules": {
      "platforms": [
        "facebook_ads", "google_adsense",
        "monetizze", "hotmart"
      ],
      "spend_and_earn_platform": true
    },
    "component": BaseTable,
    "childComponent": PerformanceTable,
    "customDate": true
  }
]

export default widgets
