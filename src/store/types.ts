import rootReducer from './rootReducer';
export type RootState = ReturnType<typeof rootReducer>

declare module "react-redux" {
    export type EqualityFnType<TSelected> = (left: TSelected, right: TSelected) => boolean

    export function useSelector<TSelected>(
        selector: (state: RootState) => TSelected,
        equalityFn?: EqualityFnType<TSelected>
    ): TSelected
}