import assert from "node:assert/strict";
import test from "node:test";
import {
  warehouseBlogClusterSeeds,
  warehouseBlogResourceSlugs,
  warehouseSiloTopics,
} from "../data/warehouseRoutes.ts";

test("every warehouse blog cluster has an intentional existing resource page", () => {
  assert.deepEqual(
    Object.keys(warehouseBlogResourceSlugs).sort(),
    [...warehouseBlogClusterSeeds].sort(),
  );

  const resourceSlugs = new Set(warehouseSiloTopics.map((topic) => topic.slug));
  for (const keyword of warehouseBlogClusterSeeds) {
    const resourceSlug = warehouseBlogResourceSlugs[keyword];
    assert.ok(resourceSlugs.has(resourceSlug), `${keyword} maps to missing resource ${resourceSlug}`);
  }
});

test("similar warehouse topics do not fall back to the generic construction resource", () => {
  assert.deepEqual(
    {
      steel: warehouseBlogResourceSlugs["Steel Warehouse Construction Dubai"],
      designBuild: warehouseBlogResourceSlugs["Warehouse Design and Build Dubai"],
      municipality: warehouseBlogResourceSlugs["Warehouse Dubai Municipality Approvals"],
      costPlanning: warehouseBlogResourceSlugs["Warehouse Cost Planning Dubai"],
    },
    {
      steel: "steel-warehouse-construction",
      designBuild: "warehouse-design-build",
      municipality: "warehouse-dm-approvals",
      costPlanning: "warehouse-cost-guide",
    },
  );
});
