import React from "react";
import SingleFoodComponent from "@/components/SingleFood";

type Props = {
  params: Promise<{ id: string }>;
};

const SingleFoodPage = async ({ params }: Props) => {
  const resolvedParams = await params;
  return <SingleFoodComponent foodId={resolvedParams.id} />;
};

export default SingleFoodPage;
