export default {
  routes: [
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/jobs/summary',
      handler: 'job.customSummary',
    },
   
  ]
}