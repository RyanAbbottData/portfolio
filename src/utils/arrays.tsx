const zip = <T, U>(a: T[], b: U[]) => a.map((item, i) => [item, b[i]] as [T, U]);

export { zip };