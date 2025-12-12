export function filterProducts(products, filters){
    const { category, subCategory, search, minPrice, maxPrice } = filters;

    return products.filter((p)=>{
        // CATEGORY filter (Pickles & Temple)
        if(category && p.category !== category) return false;

        // SUB Category filter (Veg/ NonVeg/ Puja Items/ Others)
        if(subCategory && p.subCategory !== subCategory) return false;

        // SEARCH filter
        if (search) {
            const s = search.toLowerCase();
            if (!p.name.toLowerCase().includes(s)) return false;
        }

        // Price filter
        if (minPrice && p.price < minPrice) return false;
        if (maxPrice && p.price > maxPrice) return false;

        return true;
    });
}