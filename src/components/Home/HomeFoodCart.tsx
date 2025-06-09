import React, { useMemo } from "react";
import { size } from "lodash";
import Loader from "@/helpers/ui/Loader";
import FoodCardNSlider from "./FoodCardNSlider";
import { useGetAllFoodsQuery } from "@/redux/apiSlice/apiSlice";
import { useAppSelector } from "@/redux/hooks/hooks";
import { FoodGroup } from "@/types/GroupFoodTypes";

interface HomeFoodCartProps {
  selectedCountry: string; // name of selected country/group, e.g. "Arabic"
}

const HomeFoodCart = ({ selectedCountry }: HomeFoodCartProps) => {
  // redux searchData
  const { searchData } = useAppSelector((state) => state.app);

  // all foods data
  const { data: foodsData, isLoading } = useGetAllFoodsQuery({});

  const updatedData = useMemo(() => {
    if (size(searchData)) {
      return searchData || [];
    }
    return foodsData || [];
  }, [searchData, foodsData]);

  // Filter groups and items based on selectedCountry
  const filteredData = useMemo(() => {
    if (!updatedData?.group || !updatedData?.items)
      return { group: [], items: [] };

    // Find group matching selectedCountry (case-insensitive)
    const selectedGroup = updatedData.group.find(
      (g) => g.name.toLowerCase() === selectedCountry.toLowerCase()
    );

    if (!selectedGroup) {
      // fallback: show all groups/items or empty
      return { group: [], items: [] };
    }

    // Filter items belonging to selected group
    const filteredItems = updatedData.items.filter(
      (item) => item && item.purchase_group_id === selectedGroup.id
    );

    return { group: [selectedGroup], items: filteredItems };
  }, [updatedData, selectedCountry]);

  if (isLoading)
    return (
      <div className="py-14 flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <div>
      {filteredData.group.length > 0 ? (
        filteredData.group.map((category: FoodGroup) => (
          <FoodCardNSlider
            key={category.id}
            group={category}
            items={filteredData.items}
          />
        ))
      ) : (
        <p>No food found for {selectedCountry}</p>
      )}
    </div>
  );
};

export default HomeFoodCart;
