import PlatformStatsModel from "@/models/platformStats"
import Platform from "@/facebook_ads"
import TestStats from "@/models/testStats"

export default class FacebookAdsStatsModel extends PlatformStatsModel {
  constructor(stats={}, generateTestStats=false) {
    super(Platform.id, stats, generateTestStats)
  }

  updateFromObject(o) {
    super.updateFromObject(o)

    this.credential_id = o.credential_id
    this.account_id = o.account_id
    this.campaign_id = o.campaign_id
    this.ad_id = o.ad_id

    this.account_currency = o.account_currency
    this.account_status = o.account_status
    this.actions = o.actions || []
    this.adset_schedule = o.adset_schedule
    this.balance = o.balance
    this.bid_amount = o.bid_amount
    this.bid_info = o.bid_info
    this.bid_strategy = o.bid_strategy
    this.budget_remaining = o.budget_remaining
    this.cost_per_action_type = o.cost_per_action_type || []
    this.cost_per_outbound_click = o.cost_per_outbound_click
    this.cpm = o.cpm
    this.daily_budget = o.daily_budget
    this.daily_spend_cap = o.daily_spend_cap
    this.destination_type = o.destination_type
    this.disable_reason = o.disable_reason
    this.effective_status = o.effective_status
    this.frequency = o.frequency
    this.impressions = o.impressions
    this.issues_info = o.issues_info || {}
    this.lifetime_budget = o.lifetime_budget
    this.objective = o.objective
    this.optimization_goal = o.optimization_goal
    this.outbound_clicks = o.outbound_clicks
    this.outbound_clicks_ctr = o.outbound_clicks_ctr
    this.pacing_type = o.pacing_type || []
    this.reach = o.reach
    this.recommendations = o.recommendations || []
    this.status = o.status
    this.targeting = o.targeting || {}

    this.currency = this.account_currency || o.currency
  }

  /**
   * Check PlatformStatsModel generateTestStats method
   * to see default fieldTypes not implemented here.
   */
  generateTestStats() {
    const fieldTypes = [
      {field: "account_id", method: "randomNumber"},
      {field: "campaign_id", method: "randomNumber"},
      {field: "adset_id", method: "randomNumber"},
      {field: "ad_id", method: "randomNumber"},
      {field: "profile_id", method: "randomNumber"},
      {field: "name", method: "randomName"},
      {field: "status", method: "randomPick", params: ["ACTIVE", "PAUSED"]},
      {field: "effective_status", method: "randomPick", params: ["ACTIVE", "PAUSED"]},
      {field: "balance", method: "randomNumber"},
      {field: "account_status", method: "randomPick", params: [1,1,1,2]},
      {field: "disable_reason", method: "randomPick", params: [0,0,0,0,1,2]},
      {field: "account_currency", method: "randomPick", params: ["BRL", "BRL", "BRL", "USD", "EUR"]},
      {field: "budget_remaining", method: "randomNumber"},
      {field: "daily_budget", method: "randomNumber"},
      {field: "objective", method: "randomPick", params: ["LINK_CLICKS", "CONVERSIONS", "CONVERSIONS"]},
      {field: "bid_strategy", method: "randomPick", params: ["LOWEST_COST_WITHOUT_CAP","LOWEST_COST_WITH_BID_CAP","TARGET_COST",]},
      {field: "bid_amount", method: "randomNumber"},
      {field: "lifetime_budget", method: "randomNumber"},
      {field: "pacing_type", method: "randomPick", params: ["no_pacing", "standard", "standard"]},
      {field: "cpm", method: "financeAmount"},
      {field: "cost_per_outbound_click", method: "financeAmount"},
      {field: "outbound_clicks", method: "randomNumber"},
      {field: "outbound_clicks_ctr", method: "percentage"},
      {field: "reach", method: "randomNumber"},
      {field: "frequency", method: "percentage"},
      {field: "impressions", method: "randomNumber"},
    ]

    // TODO: check fields and make test stats
    // this.adset_schedule = o.adset_schedule
    // this.bid_info = o.bid_info
    // this.daily_spend_cap = o.daily_spend_cap
    // this.destination_type = o.destination_type
    // this.issues_info = o.issues_info || {}
    // this.optimization_goal = o.optimization_goal
    // this.recommendations = o.recommendations || []
    // this.targeting = o.targeting || {}

    super.generateTestStats(fieldTypes)

    this.account_id = "act_" + this.account_id

    this.actions = [
      {
        value: TestStats.randomNumber(),
        action_type: "landing_page_view"
      },
      {
        value: TestStats.randomNumber(),
        action_type: "comment"
      },
      {
        value: TestStats.randomNumber(),
        action_type: "onsite_conversion.post_save"
      },
      {
        value: TestStats.randomNumber(),
        action_type: "like"
      },
      {
        value: TestStats.randomNumber(),
        action_type: "link_click"
      },
      {
        value: TestStats.randomNumber(),
        action_type: "offsite_conversion.fb_pixel_initiate_checkout"
      },
      {
        value: TestStats.randomNumber(),
        action_type: "offsite_conversion.fb_pixel_purchase"
      },
      {
        value: TestStats.randomNumber(),
        action_type: "post"
      },
      {
        value: TestStats.randomNumber(),
        action_type: "post_reaction"
      },
      {
        value: TestStats.randomNumber(),
        action_type: "post_engagement"
      },
      {
        value: TestStats.randomNumber(),
        action_type: "page_engagement"
      },
      {
        value: TestStats.randomNumber(),
        action_type: "omni_initiated_checkout"
      },
      {
        value: TestStats.randomNumber(),
        action_type: "omni_purchase"
      }
    ]
    this.cost_per_action_type = [
      {
        value: TestStats.financeAmount(),
        action_type: "landing_page_view"
      },
      {
        value: TestStats.financeAmount(),
        action_type: "onsite_conversion.post_save"
      },
      {
        value: TestStats.financeAmount(),
        action_type: "like"
      },
      {
        value: TestStats.financeAmount(),
        action_type: "link_click"
      },
      {
        value: TestStats.financeAmount(),
        action_type: "post_engagement"
      },
      {
        value: TestStats.financeAmount(),
        action_type: "page_engagement"
      },
      {
        value: TestStats.financeAmount(),
        action_type: "omni_initiated_checkout"
      },
      {
        value: TestStats.financeAmount(),
        action_type: "omni_purchase"
      }
    ]

  }
}
