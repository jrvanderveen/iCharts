const sortModelsByRegionId = (a, b) => {
  if (a.regionId < b.regionId)
    return -1;
  else if (a.regionId > b.regionId)
    return 1;
  else
    return 0;
};

export default sortModelsByRegionId;
