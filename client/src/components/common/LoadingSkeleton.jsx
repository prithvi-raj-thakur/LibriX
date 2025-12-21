import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export function BookCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-md">
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function OrderCardSkeleton() {
  return (
    <div className="rounded-xl bg-white shadow-md p-4">
      <div className="flex gap-4">
        <Skeleton className="w-20 h-28 rounded-lg" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    </div>
  );
}

export function NotificationSkeleton() {
  return (
    <div className="rounded-xl bg-white shadow-sm p-4">
      <div className="flex items-start gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function DashboardStatSkeleton() {
  return (
    <div className="rounded-xl bg-white shadow-md p-6">
      <Skeleton className="h-4 w-1/2 mb-3" />
      <Skeleton className="h-8 w-2/3 mb-2" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  );
}