
const getVisibilityCutoffDate = () => {
  const months = parseInt(process.env.COMMENT_VISIBILITY_MONTHS, 10) || 6;
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);
  return cutoff;
};

module.exports = { getVisibilityCutoffDate };
