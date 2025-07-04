export const CAR_LIST_QUERY = {
    fields: ['id', 'name', 'slug', 'pricePerDay'],
    populate: {
        images: { fields: ['url'] },
        brand: {
            fields: ['id', 'car_Brand', 'slug'],
            populate: { logo: { fields: ['url'] } }
        },
        car_category: { fields: ['id', 'cartype', 'slug'] },
        car_subcategory: { fields: ['id', 'categorySubType', 'slug'] }
    }
};
export const CAR_CATEGORY_QUERY = {
    fields: ['id', 'cartype', 'slug',],
    populate: {
        image: { fields: ['url'] },
        car_subcategories: { fields: ['id', 'categorySubType', 'slug'] }
    }
}
export const buildQueryParams = (options = {}) => {
    const {
        fields = [],
        populate = {},
        filters = {},
        pagination = {},
        sort = {}
    } = options;

    const params = new URLSearchParams();

    // Recursive function to handle nested filter structures
    const addNestedFilter = (prefix, filterObj) => {
        Object.entries(filterObj).forEach(([key, value]) => {
            if (key === '$or' || key === '$and') {
                // Handle $or/$and arrays
                value.forEach((condition, index) => {
                    Object.entries(condition).forEach(([field, conditionValue]) => {
                        if (typeof conditionValue === 'object') {
                            Object.entries(conditionValue).forEach(([operator, opValue]) => {
                                params.append(`${prefix}[${key}][${index}][${field}][${operator}]`, opValue);
                            });
                        } else {
                            params.append(`${prefix}[${key}][${index}][${field}]`, conditionValue);
                        }
                    });
                });
            } else if (typeof value === 'object' && value !== null) {
                // Handle nested objects
                Object.entries(value).forEach(([operator, opValue]) => {
                    if (typeof opValue === 'object' && opValue !== null) {
                        // Handle deeply nested objects (like car_Brand)
                        Object.entries(opValue).forEach(([subOperator, subValue]) => {
                            params.append(`${prefix}[${key}][${operator}][${subOperator}]`, subValue);
                        });
                    } else {
                        params.append(`${prefix}[${key}][${operator}]`, opValue);
                    }
                });
            } else {
                // Handle simple key-value pairs
                params.append(`${prefix}[${key}]`, value);
            }
        });
    };

    // Add filters
    if (Object.keys(filters).length > 0) {
        addNestedFilter('filters', filters);
    }

    // Add root-level pagination
    Object.entries(pagination).forEach(([key, value]) => {
        params.append(`pagination[${key}]`, value);
    });

    // Handle populate=*
    if (populate === '*') {
        params.append('populate', '*');
    }
    // Handle specific population
    else if (typeof populate === 'object') {
        const addPopulate = (prefix, obj) => {
            Object.entries(obj).forEach(([key, value]) => {
                if (key === 'fields' && Array.isArray(value)) {
                    value.forEach((field, idx) => {
                        params.append(`${prefix}[fields][${idx}]`, field);
                    });
                }
                // Handle nested pagination within populate
                else if (key === 'pagination' && typeof value === 'object') {
                    Object.entries(value).forEach(([paginationKey, paginationValue]) => {
                        params.append(`${prefix}[pagination][${paginationKey}]`, paginationValue);
                    });
                }
                else if (typeof value === 'object' && value !== null) {
                    addPopulate(`${prefix}[${key}]`, value);
                } else {
                    params.append(`${prefix}[${key}]`, value);
                }
            });
        };

        Object.entries(populate).forEach(([key, value]) => {
            if (typeof value === 'object') {
                addPopulate(`populate[${key}]`, value);
            } else {
                params.append(`populate[${key}]`, value);
            }
        });
    }

    // Add fields
    fields.forEach((field, index) => {
        params.append(`fields[${index}]`, field);
    });

    // Add sorting
    Object.entries(sort).forEach(([key, value]) => {
        params.append(`sort[${key}]`, value);
    });

    return params.toString();
};
const phoneNumber = "971555046240"; // Replace with your actual phone number

export const handleCallClick = () => {
    // This will work on mobile devices
    window.location.href = `tel:${phoneNumber}`;

    // For desktop browsers, you might want to show a message
    if (!/Mobi|Android/i.test(navigator.userAgent)) {
        alert(`Call ${phoneNumber} from your phone`);
    }
};

export const handleWhatsAppClick = (carName: string, link: string) => {
    // Encode the message for URL
    const message = `I'm interested in this car: ${carName}
    ${link}`;
    const encodedMessage = encodeURIComponent(message);
    // Check if user is on mobile
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
    } else {
        window.open(
            `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
        );
    }
};
// export const buildQueryParams = (options = {}) => {
//     const {
//         fields = [],
//         populate = {},
//         filters = {},
//         pagination = {},
//         sort = {}
//     } = options;

//     const params = new URLSearchParams();

//     // Improved filter handling
//     const addFilters = (prefix, filterObj) => {
//         Object.entries(filterObj).forEach(([key, value]) => {
//             if (typeof value === 'object' && value !== null) {
//                 Object.entries(value).forEach(([operator, val]) => {
//                     if (typeof val === 'object') {
//                         Object.entries(val).forEach(([subOp, subVal]) => {
//                             params.append(`${prefix}[${key}][${operator}][${subOp}]`, subVal);
//                         });
//                     } else {
//                         params.append(`${prefix}[${key}][${operator}]`, val);
//                     }
//                 });
//             } else {
//                 params.append(`${prefix}[${key}]`, value);
//             }
//         });
//     };

//     // Add filters
//     if (Object.keys(filters).length > 0) {
//         addFilters('filters', filters);
//     }

//     // Add root-level pagination
//     Object.entries(pagination).forEach(([key, value]) => {
//         params.append(`pagination[${key}]`, value);
//     });

//     // Handle populate=*
//     if (populate === '*') {
//         params.append('populate', '*');
//     }
//     // Handle specific population
//     else if (typeof populate === 'object') {
//         const addPopulate = (prefix, obj) => {
//             Object.entries(obj).forEach(([key, value]) => {
//                 if (key === 'fields' && Array.isArray(value)) {
//                     value.forEach((field, idx) => {
//                         params.append(`${prefix}[fields][${idx}]`, field);
//                     });
//                 }
//                 // Handle nested pagination within populate
//                 else if (key === 'pagination' && typeof value === 'object') {
//                     Object.entries(value).forEach(([paginationKey, paginationValue]) => {
//                         params.append(`${prefix}[pagination][${paginationKey}]`, paginationValue);
//                     });
//                 }
//                 else if (typeof value === 'object' && value !== null) {
//                     addPopulate(`${prefix}[${key}]`, value);
//                 } else {
//                     params.append(`${prefix}[${key}]`, value);
//                 }
//             });
//         };

//         Object.entries(populate).forEach(([key, value]) => {
//             if (typeof value === 'object') {
//                 addPopulate(`populate[${key}]`, value);
//             } else {
//                 params.append(`populate[${key}]`, value);
//             }
//         });
//     }

//     // Add fields
//     fields.forEach((field, index) => {
//         params.append(`fields[${index}]`, field);
//     });

//     // Add sorting
//     Object.entries(sort).forEach(([key, value]) => {
//         params.append(`sort[${key}]`, value);
//     });

//     return params.toString();
// };
// export const buildQueryParams = (options = {}) => {
//     const {
//         fields = [],
//         populate = {},
//         filters = {},
//         pagination = {},
//         sort = {}
//     } = options;

//     const params = new URLSearchParams();

//     // Improved filter handling
//     const addFilters = (prefix, filterObj) => {
//         Object.entries(filterObj).forEach(([key, value]) => {
//             if (typeof value === 'object' && value !== null) {
//                 // Handle nested filter objects (like slug: { $eq: 'value' })
//                 Object.entries(value).forEach(([operator, val]) => {
//                     if (typeof val === 'object') {
//                         // Handle doubly nested objects
//                         Object.entries(val).forEach(([subOp, subVal]) => {
//                             params.append(`${prefix}[${key}][${operator}][${subOp}]`, subVal);
//                         });
//                     } else {
//                         params.append(`${prefix}[${key}][${operator}]`, val);
//                     }
//                 });
//             } else {
//                 params.append(`${prefix}[${key}]`, value);
//             }
//         });
//     };

//     // Add filters
//     addFilters('filters', filters);

//     // Add pagination
//     Object.entries(pagination).forEach(([key, value]) => {
//         params.append(`pagination[${key}]`, value);
//     });

//     // Handle populate=*
//     if (populate === '*') {
//         params.append('populate', '*');
//     }
//     // Handle specific population
//     else {
//         const addPopulate = (prefix, obj) => {
//             Object.entries(obj).forEach(([key, value]) => {
//                 if (key === 'fields' && Array.isArray(value)) {
//                     value.forEach((field, idx) => {
//                         params.append(`${prefix}[fields][${idx}]`, field);
//                     });
//                 } else if (typeof value === 'object' && value !== null) {
//                     addPopulate(`${prefix}[${key}]`, value);
//                 } else {
//                     params.append(`${prefix}[${key}]`, value);
//                 }
//             });
//         };

//         Object.entries(populate).forEach(([key, value]) => {
//             if (typeof value === 'object') {
//                 addPopulate(`populate[${key}]`, value);
//             } else {
//                 params.append(`populate[${key}]`, value);
//             }
//         });
//     }

//     // Add fields
//     fields.forEach((field, index) => {
//         params.append(`fields[${index}]`, field);
//     });

//     // Add sorting
//     Object.entries(sort).forEach(([key, value]) => {
//         params.append(`sort[${key}]`, value);
//     });

//     return params.toString();
// };