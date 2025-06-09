import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

// Typed versions of useDispatch and useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <T>(selector: (state: RootState) => T) => T =
  useSelector;
