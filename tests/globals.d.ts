declare namespace jest {
    interface Matchers<R> {
        stubToHaveBeenCalledWith(...args: any[]): object;
    }

    interface Expect {
        stubToHaveBeenCalledWith(...args: any[]): object;
    }
}
