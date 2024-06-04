import { Skeleton } from "@mui/material";

const CarSkeleton = () => {
  return (
    <Skeleton
      sx={{ width: "100%", height: "350px", margin: "0px", padding: "0px" }}
    >
      {/* <Skeleton className="relative">
        <Skeleton className="aspect-[4/3] rounded-b"></Skeleton>
      </Skeleton>
      <Skeleton className="p-4">
        <h3 className="text-lg font-semibold"></h3>
        <div className="flex"></div>
      </Skeleton> */}
    </Skeleton>
  );
};

export default CarSkeleton;
