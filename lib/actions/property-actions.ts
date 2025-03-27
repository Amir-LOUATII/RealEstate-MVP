"use server";

import { PropertyStatus } from "@prisma/client";
import { prisma } from "../db";
import { PropertiesQueryParams } from "../types";

interface PriceFilter {
  gte?: number;
  lte?: number;
}

interface Filters {
  OR?: Array<{
    title?: { contains: string; mode: "insensitive" };
  }>;
  status?: PropertyStatus;
  price?: PriceFilter;
}

export async function getAllProperties({
  search = "",
  page = "0",
  pageSize = "6", // Changed default to a more reasonable value
  minPrice,
  maxPrice,
  status,
}: PropertiesQueryParams) {
  try {
    const filters: Filters = {};

    if (search) {
      filters.OR = [{ title: { contains: search, mode: "insensitive" } }];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filters.price = {};
      if (minPrice !== undefined) filters.price.gte = Number(minPrice);
      if (maxPrice !== undefined) filters.price.lte = Number(maxPrice);
    }
    if (status) {
      filters.status = status;
    }
    const skip = Number(page) * Number(pageSize);
    const take = Number(pageSize);
    console.log("filters", filters);
    console.log("status", status);

    const [totalCount, properties] = await Promise.all([
      prisma.property.count({
        where: { ...filters },
      }),
      prisma.property.findMany({
        where: filters,
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take,
        include: { agent: true },
      }),
    ]);

    return {
      properties,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / take),
        currentPage: Number(page),
        pageSize: take,
        hasMore: skip + take < totalCount,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}
export async function getPropertyById(id: string) {
  const product = await prisma.property.findUnique({
    where: { id: id },
    include: { agent: true, features: { include: { feature: true } } },
  });
  return product;
}
