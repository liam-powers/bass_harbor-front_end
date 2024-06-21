export interface CommonFilters {
    usedNew?: String;
    priceRange?: Number[];
    location?: String;
    yearsBetween?: Number[];
    keywords?: String[];
};

export interface UprightBassFilters extends CommonFilters {
    carved: Boolean;
    hybrid: Boolean;
    plywood: Boolean;
}

export interface BassGuitarFilters extends CommonFilters {
    jazzBass: Boolean;
    precisionBass: Boolean;
    active: Boolean;
    passive: Boolean;
    numStrings?: Number;
}