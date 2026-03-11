/**
 * Formats a price string to always show full number with commas and AED.
 * Always shows full number with commas, no "M" abbreviation.
 * 
 * @param price - The price string (can contain numbers, commas, currency symbols, etc.)
 * @returns Formatted price string with full number and commas
 * 
 * @example
 * formatPrice("1500000") // "1,500,000 AED"
 * formatPrice("AED 2,500,000") // "2,500,000 AED"
 * formatPrice("500000") // "500,000 AED"
 * formatPrice("1.5M") // "1,500,000 AED"
 */
export function formatPrice(price: string | undefined | null): string {
    if (!price || price === "N/A" || price.trim() === "") {
        return "N/A";
    }

    // If it's already a formatted string with commas and AED, return as is
    if (typeof price === "string" && /AED/i.test(price) && /,/.test(price)) {
        return price;
    }

    // If it has "M" in it, convert it to full number first
    let numValue: number;
    if (typeof price === "string" && /M/i.test(price)) {
        const numPart = parseFloat(price.replace(/[^\d.]/g, ""));
        numValue = !isNaN(numPart) ? numPart * 1000000 : parseFloat(price.replace(/[^\d.]/g, ""));
    } else {
        // Extract numeric value from the price string
        const numericPrice = price.toString().replace(/[^\d]/g, "");
        numValue = numericPrice ? parseFloat(numericPrice) : NaN;
    }

    if (isNaN(numValue) || !numValue) {
        return price.toString(); // Return original if not a valid number
    }

    // Always format with commas, no "M" abbreviation
    return `${numValue.toLocaleString("en-US")} AED`;
}

