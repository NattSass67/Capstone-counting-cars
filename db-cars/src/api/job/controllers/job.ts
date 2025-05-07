/**
 * job controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::job.job", ({ strapi }) => ({
  // GET /jobs/custom-summary
  async customSummary(ctx) {
    const entries = await strapi.documents("api::job.job").findMany();

    for (let i = 0; i < entries.length; i++) {
      let jobid = entries[i].id;
      let status;

      const tasks = await strapi.documents("api::task.task").findMany({
        filters: {
          job: jobid as any,
        },
      });

      const allDone =
        tasks.length > 0 && tasks.every((task) => task.taskStatus === "done");

      entries[i]["countingStatus"] = allDone ? "Done" : "Processing"; //insert new prop
    }

    ctx.body = {
      data: entries,
    };
  },
}));
