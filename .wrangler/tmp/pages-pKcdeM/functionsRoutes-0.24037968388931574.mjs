import { onRequestGet as __api_waitlist_count_js_onRequestGet } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/waitlist/count.js"
import { onRequestOptions as __api_waitlist_count_js_onRequestOptions } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/waitlist/count.js"
import { onRequestPost as __api__dunning_scheduler_js_onRequestPost } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/_dunning-scheduler.js"
import { onRequestGet as __api_analytics_js_onRequestGet } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/analytics.js"
import { onRequestOptions as __api_analytics_js_onRequestOptions } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/analytics.js"
import { onRequestGet as __api_cancel_flow_js_onRequestGet } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/cancel-flow.js"
import { onRequestOptions as __api_cancel_flow_js_onRequestOptions } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/cancel-flow.js"
import { onRequestPost as __api_cancel_flow_js_onRequestPost } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/cancel-flow.js"
import { onRequestGet as __api_events_js_onRequestGet } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/events.js"
import { onRequestOptions as __api_events_js_onRequestOptions } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/events.js"
import { onRequestPost as __api_events_js_onRequestPost } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/events.js"
import { onRequestGet as __api_health_js_onRequestGet } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/health.js"
import { onRequestDelete as __api_projects_js_onRequestDelete } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/projects.js"
import { onRequestGet as __api_projects_js_onRequestGet } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/projects.js"
import { onRequestOptions as __api_projects_js_onRequestOptions } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/projects.js"
import { onRequestPost as __api_projects_js_onRequestPost } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/projects.js"
import { onRequestPut as __api_projects_js_onRequestPut } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/projects.js"
import { onRequestPost as __api_stripe_webhook_js_onRequestPost } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/stripe-webhook.js"
import { onRequestOptions as __api_waitlist_index_js_onRequestOptions } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/waitlist/index.js"
import { onRequestPost as __api_waitlist_index_js_onRequestPost } from "/Users/dawoodazeeza/.openclaw/workspace/churnrecovery/functions/api/waitlist/index.js"

export const routes = [
    {
      routePath: "/api/waitlist/count",
      mountPath: "/api/waitlist",
      method: "GET",
      middlewares: [],
      modules: [__api_waitlist_count_js_onRequestGet],
    },
  {
      routePath: "/api/waitlist/count",
      mountPath: "/api/waitlist",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_waitlist_count_js_onRequestOptions],
    },
  {
      routePath: "/api/_dunning-scheduler",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api__dunning_scheduler_js_onRequestPost],
    },
  {
      routePath: "/api/analytics",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_analytics_js_onRequestGet],
    },
  {
      routePath: "/api/analytics",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_analytics_js_onRequestOptions],
    },
  {
      routePath: "/api/cancel-flow",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_cancel_flow_js_onRequestGet],
    },
  {
      routePath: "/api/cancel-flow",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_cancel_flow_js_onRequestOptions],
    },
  {
      routePath: "/api/cancel-flow",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_cancel_flow_js_onRequestPost],
    },
  {
      routePath: "/api/events",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_events_js_onRequestGet],
    },
  {
      routePath: "/api/events",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_events_js_onRequestOptions],
    },
  {
      routePath: "/api/events",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_events_js_onRequestPost],
    },
  {
      routePath: "/api/health",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_health_js_onRequestGet],
    },
  {
      routePath: "/api/projects",
      mountPath: "/api",
      method: "DELETE",
      middlewares: [],
      modules: [__api_projects_js_onRequestDelete],
    },
  {
      routePath: "/api/projects",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_projects_js_onRequestGet],
    },
  {
      routePath: "/api/projects",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_projects_js_onRequestOptions],
    },
  {
      routePath: "/api/projects",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_projects_js_onRequestPost],
    },
  {
      routePath: "/api/projects",
      mountPath: "/api",
      method: "PUT",
      middlewares: [],
      modules: [__api_projects_js_onRequestPut],
    },
  {
      routePath: "/api/stripe-webhook",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_stripe_webhook_js_onRequestPost],
    },
  {
      routePath: "/api/waitlist",
      mountPath: "/api/waitlist",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_waitlist_index_js_onRequestOptions],
    },
  {
      routePath: "/api/waitlist",
      mountPath: "/api/waitlist",
      method: "POST",
      middlewares: [],
      modules: [__api_waitlist_index_js_onRequestPost],
    },
  ]