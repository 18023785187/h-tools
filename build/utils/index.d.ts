export declare function checkType(value: any, type: string): boolean;
export declare function isMobile(): boolean;
export declare function throttleDebounce(func: (...rest: any[]) => void, delay?: number): (this: any, ...rest: any[]) => void;
export declare function throttle<T>(func: (...rest: any[]) => T, delay: number): (this: any, ...rest: any[]) => T | undefined;
