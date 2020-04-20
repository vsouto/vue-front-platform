import Vue from "vue"
import Router from "vue-router"
import i18n from "@/i18n"
import store from "@/store"

// Containers
const DefaultLayout = () => import(/* webpackChunkName: "container" */ "@/views/layouts/DefaultLayout")
const DefaultRouterView = () => import(/* webpackChunkName: "container" */ "@/views/layouts/DefaultRouterView")

/*** Light weight --> Must open fast ***/
const NotFound = () => import(/* webpackChunkName: "lightweight" */ "@/views/NotFound")
const Callback = () => import(/* webpackChunkName: "lightweight" */ "@/views/Callback")

/*** Generic views ***/
const Onboard = () => import("@/views/Onboard")
const Integration = () => import("@/views/Integration")

/*** Billing and Plans ***/
const Subscriptions = () => import("@/subscriptions/views/home")
const Billing = () => import("@/subscriptions/views/billing")

/*** Users Views ***/
const Settings = () => import(/* webpackChunkName: "user" */ "@/views/Settings")

/*** Panels Views ***/
const Home = () => import(/* webpackChunkName: "panel" */ "@/views/Home")
const Panel = () => import(/* webpackChunkName: "panel" */ "@/views/Panel")

/*** Facebook Ads Views ***/
const FacebookAds = () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/views/home")
const FacebookAdsLoadBusinesses = () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/views/loadBusinesses")
const FacebookAdsLoadAccounts = () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/views/loadAccounts")
const FacebookAdsCampaigns = () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/views/campaigns")
const FacebookAdsAdsets = () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/views/adsets")
const FacebookAdsAds = () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/views/ads")
const FacebookAdsCreatives = () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/views/creatives")
const FacebookAdsAccounts = () => import(/* webpackChunkName: "facebook-ads" */ "@/facebook_ads/views/accounts")

/*** Google Ads Views ***/
const GoogleAds = () => import(/* webpackChunkName: "google-ads" */ "@/google_ads/views/home")
const GoogleAdsLoadCustomers = () => import(/* webpackChunkName: "google-ads" */ "@/google_ads/views/loadCustomers")
const GoogleAdsLoadCustomerAccounts = () => import(/* webpackChunkName: "google-ads" */ "@/google_ads/views/loadCustomerAccounts")

/*** Google Adsense Views ***/
const GoogleAdsense = () => import(/* webpackChunkName: "google-adsense" */ "@/google_adsense/views/home")

/*** Hotmart Views ***/
const Hotmart = () => import(/* webpackChunkName: "hotmart" */ "@/hotmart/views/home")
const HotmartAffiliations = () => import(/* webpackChunkName: "hotmart" */ "@/hotmart/views/affiliations")
const HotmartSubscriptions = () => import(/* webpackChunkName: "hotmart" */ "@/hotmart/views/subscriptions")

/*** Monetizze Views ***/
const Monetizze = () => import(/* webpackChunkName: "monetizze" */ "@/monetizze/views/home")

/*** Router Guards ***/
import { isAuthorized } from "./guards/is-authorized"
import { HasActivePlan } from "./guards/has-active-plan"
import { fetchAssets } from "./guards/fetch-assets"
import RouteGuard from "@/utils/route-guard"

Vue.use(Router)

const router = new Router({
  mode: "history",
  linkActiveClass: "open active",
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: "/404",
      component: NotFound
    },
    {
      path: "/register",
      name: "Register",
      beforeEnter() {
        store.dispatch("account/register")
      }
    },
    {
      path: "/login",
      name: "Login",
      beforeEnter(to) {
        store.dispatch("account/login", to.query.redirect)
      }
    },
    {
      path: "/logout",
      name: "Logout",
      beforeEnter() {
        store.dispatch("account/logout")
      }
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      path: "/callback",
      name: "Callback",
      component: Callback,
    },
    {
      path: "/subscriptions",
      component: DefaultLayout,
      children: [
        {
          path: "",
          redirect: "/subscriptions/plans",
          meta: {
            meta: {
              label: i18n.tc("common.subscription")
            },
          },
          component: DefaultRouterView,
          children: [
            {
              path: "plans",
              name: "Subscriptions",
              meta: {
                label: i18n.tc("common.subscriptions"),
              },
              component: Subscriptions,
            },
            {
              path: "checkout/:planRef",
              name: "CheckoutSubscription",
              meta: {
                label: i18n.tc("common.billing"),
              },
              component: Billing,
              props: (route) => ({
                ...route.params
              })
            }
          ]
        },
      ]
    },
    {
      path: "",
      meta: {
        label: i18n.tc("breadcrumb./home"),
      },
      component: DefaultLayout,
      beforeEnter: RouteGuard([
        isAuthorized,
        HasActivePlan,
        fetchAssets
      ]),
      children: [
        {
          path: "/",
          redirect: "/home"
        },
        {
          path: "/onboard",
          name: "Onboard",
          component: Onboard,
          meta: {
            label: i18n.tc("breadcrumb./onboard"),
          }
        },
        {
          path: "/integration",
          name: "Integration",
          component: Integration,
          meta: {
            label: i18n.tc("breadcrumb./integration"),
          },
        },
        {
          path: "/home",
          name: "Home",
          meta: {
            label: i18n.tc("common.main"),
          },
          component: Home
        },
        {
          path: "/settings",
          name: "Settings",
          meta: {
            label: i18n.tc("breadcrumb./settings")
          },
          component: Settings
        },
        /* Panel */
        {
          path: "/panel",
          meta: {
            label: i18n.tc("breadcrumb.panels"),
          },
          component: DefaultRouterView,
          children: [
            {
              path: "",
              redirect: "/home"
            },
            {
              path: "editor/create",
              name: "PanelCreate",
              meta: {
                label: i18n.tc("breadcrumb.panel/editor/create"),
              },
              component: Panel,
              props: {
                creating: true,
                id: "creating"
              }
            },
            {
              path: ":id",
              name: "Panel",
              component: Panel,
              props: true
            }
          ]
        },

        /* Facebook Ads */
        {
          path: "/facebook-ads",
          meta: {
            label: "Facebook Ads"
          },
          component: DefaultRouterView,
          children: [
            {
              path: "",
              name: "FacebookAds",
              meta: {
                label: i18n.tc("common.manage"),
              },
              component: FacebookAds
            },
            {
              path: ":profileId/businesses",
              name: "FacebookAdsLoadBusinesses",
              meta: {
                label: i18n.tc("facebook_ads.select_business"),
              },
              component: FacebookAdsLoadBusinesses,
              props: (route) => ({
                ...route.params
              })
            },
            {
              path: ":profileId/businesses/:businessId/accounts",
              name: "FacebookAdsLoadAccounts",
              meta: {
                label: i18n.tc("facebook_ads.select_accounts"),
              },
              component: FacebookAdsLoadAccounts,
              props: (route) => ({
                ...route.params
              })
            },
            {
              path: "campaigns",
              name: "FacebookAdsCampaigns",
              meta: {
                label: i18n.tc("facebook_ads.campaigns"),
              },
              component: FacebookAdsCampaigns,
              props: (route) => ({
                ...route.params
              })
            },
            {
              path: "adsets",
              name: "FacebookAdsAdsets",
              meta: {
                label: i18n.tc("facebook_ads.adsets"),
              },
              component: FacebookAdsAdsets,
              props: (route) => ({
                ...route.params
              })
            },
            {
              path: "campaign/:campaignId/adsets",
              name: "FacebookAdsCampaignAdsets",
              meta: {
                label: i18n.tc("facebook_ads.adsets"),
              },
              component: FacebookAdsAdsets,
              props: (route) => ({
                ...route.params
              })
            },
            {
              path: "ads",
              name: "FacebookAdsAds",
              meta: {
                label: i18n.tc("facebook_ads.ads"),
              },
              component: FacebookAdsAds,
              props: (route) => ({
                ...route.params
              })
            },
            {
              path: "adset/:adsetId/ads",
              name: "FacebookAdsAdsetAds",
              meta: {
                label: i18n.tc("facebook_ads.ads"),
              },
              component: FacebookAdsAds,
              props: (route) => ({
                ...route.params
              })
            },
            {
              path: "creatives",
              name: "FacebookAdsCreatives",
              meta: {
                label: i18n.tc("facebook_ads.creatives"),
              },
              component: FacebookAdsCreatives,
              props: (route) => ({
                ...route.params
              })
            },
            {
              path: "accounts",
              name: "FacebookAdsAccounts",
              meta: {
                label: i18n.tc("facebook_ads.accounts"),
              },
              component: FacebookAdsAccounts,
              props: (route) => ({
                ...route.params
              })
            },
            {
              path: "account/:accountId/campaigns",
              name: "FacebookAdsAccountCampaigns",
              meta: {
                label: i18n.tc("facebook_ads.campaigns"),
              },
              component: FacebookAdsCampaigns,
              props: (route) => ({
                ...route.params
              })
            },
            {
              path: "account/:accountId/adsets",
              name: "FacebookAdsAccountAdsets",
              meta: {
                label: i18n.tc("facebook_ads.adsets"),
              },
              component: FacebookAdsAdsets,
              props: (route) => ({
                ...route.params
              })
            },
            {
              path: "account/:accountId/ads",
              name: "FacebookAdsAccountAds",
              meta: {
                label: i18n.tc("facebook_ads.ads"),
              },
              component: FacebookAdsAds,
              props: (route) => ({
                ...route.params
              })
            }
          ]
        },

        /* Google Adsense */
        {
          path: "/google-adsense",
          meta: {
            label: "Google Adsense"
          },
          component: DefaultRouterView,
          children: [
            {
              path: "",
              name: "GoogleAdsense",
              meta: {
                label: i18n.tc("common.manage"),
              },
              component: GoogleAdsense
            }
          ]
        },

        /* Google Ads */
        {
          path: "/google-ads",
          meta: {
            label: "Google Ads"
          },
          component: DefaultRouterView,
          children: [
            {
              path: "",
              name: "GoogleAds",
              meta: {
                label: i18n.tc("common.manage"),
              },
              component: GoogleAds
            },
            {
              path: ":profileId/customer",
              name: "GoogleAdsLoadCustomers",
              meta: {
                label: i18n.tc("google_ads.select_customer"),
              },
              component: GoogleAdsLoadCustomers,
              props: (route) => ({
                ...route.params
              })
            },
            {
              path: ":profileId/customer/:customerId/accounts",
              name: "GoogleAdsLoadCustomerAccounts",
              meta: {
                label: i18n.tc("google_ads.select_accounts"),
              },
              component: GoogleAdsLoadCustomerAccounts,
              props: (route) => ({
                ...route.params
              })
            },
          ]
        },

        /* Hotmart */
        {
          path: "/hotmart",
          meta: {
            label: "Hotmart"
          },
          component: DefaultRouterView,
          children: [
            {
              path: "",
              name: "Hotmart",
              meta: {
                label: i18n.tc("common.manage"),
              },
              component: Hotmart
            },
            {
              path: ":id/affiliations",
              name: "HotmartAffiliations",
              meta: {
                label: "Affiliations",
              },
              component: HotmartAffiliations
            },
            {
              path: ":id/subscriptions",
              name: "HotmartSubscriptions",
              meta: {
                label: "Subscriptions",
              },
              component: HotmartSubscriptions
            }
          ]
        },

        /* Monetizze */
        {
          path: "/monetizze",
          meta: {
            label: "Monetizze"
          },
          component: DefaultRouterView,
          children: [
            {
              path: "",
              name: "Monetizze",
              meta: {
                label: i18n.tc("common.manage"),
              },
              component: Monetizze
            }
          ]
        },

        /* Google Analytics
        {
          path: "/google-analytics",
          meta: {
            label: "Google Analytics"
          },
          component: DefaultRouterView,
          children: [
            {
              path: "",
              name: "GoogleAnalytics",
              meta: {
                label: i18n.tc("common.manage"),
              },
              component: GoogleAnalytics
            },
            {
              path: ":profile_id/accounts",
              name: "GoogleAnalyticsAccounts",
              meta: {
                label: "Contas",
              },
              component: GoogleAnalyticsAccounts
            },
            {
              path: ":account_id/properties",
              name: "GoogleAnalyticsProperties",
              meta: {
                label: "Propriedades",
              },
              component: GoogleAnalyticsProperties
            },
            {
              path: ":property_id/views",
              name: "GoogleAnalyticsViews",
              meta: {
                label: "Visualizações",
              },
              component: GoogleAnalyticsViews
            },
            {
              path: ":view_id/report",
              name: "GoogleAnalyticsReport",
              meta: {
                label: "Report",
              },
              component: GoogleAnalyticsReport
            }
          ]
        },
        */

        /* Youtube
        {
          path: "/youtube",
          meta: {
            label: "Youtube"
          },
          component: DefaultRouterView,
          children: [
            {
              path: "",
              name: "Youtube",
              meta: {
                label: i18n.tc("common.manage"),
              },
              component: Youtube
            }
          ]
        },
        */

        /* Shopify
        {
          path: "/shopify",
          meta: {
            label: "Shopify"
          },
          component: DefaultRouterView,
          children: [
            {
              path: "",
              name: "Shopify",
              meta: {
                label: i18n.tc("common.manage"),
              },
              component: Shopify
            },
          ]
        },
        */
      ]
    }
  ]
})

router.afterEach((to, from) => {

  if (process.env.VUE_APP_MOCKS === "1")
    window.$notify({
      type: "danger",
      message: "ATENÇÃO! Mocks ativados!"
    })
})

export default router
