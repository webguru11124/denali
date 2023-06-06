const isDefined = <T>(value: T | undefined): value is T => value !== undefined;

export { isDefined };
export default isDefined;
