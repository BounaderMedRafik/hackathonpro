import SearchLotContent from "@/components/core/searchPage/SearchLotContent";
import React, { use } from "react";

type tParams = Promise<{ id: string }>;

interface SpecificTagPageProps {
  params: tParams;
}

export default function SearchLotPage({ params }: SpecificTagPageProps) {
  const { id } = use(params);

  return (
    <div>
      <SearchLotContent id={id} />
    </div>
  );
}
