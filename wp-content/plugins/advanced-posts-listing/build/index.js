/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/pin.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/pin.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const pin = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "m21.5 9.1-6.6-6.6-4.2 5.6c-1.2-.1-2.4.1-3.6.7-.1 0-.1.1-.2.1-.5.3-.9.6-1.2.9l3.7 3.7-5.7 5.7v1.1h1.1l5.7-5.7 3.7 3.7c.4-.4.7-.8.9-1.2.1-.1.1-.2.2-.3.6-1.1.8-2.4.6-3.6l5.6-4.1zm-7.3 3.5.1.9c.1.9 0 1.8-.4 2.6l-6-6c.8-.4 1.7-.5 2.6-.4l.9.1L15 4.9 19.1 9l-4.9 3.6z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pin);
//# sourceMappingURL=pin.js.map

/***/ }),

/***/ "./src/components/WepPagination.jsx":
/*!******************************************!*\
  !*** ./src/components/WepPagination.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const WepPagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  attributes
}) => {
  const {
    prevName,
    nextName,
    ReadMoreBgColor,
    ReadMoreTextColor,
    showReadMoreToggler
  } = attributes;
  const [currentPage, setCurrentPage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const goToPage = page => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wep-pagination",
    style: {
      ...(showReadMoreToggler && {
        "--wep-pagination-bg": ReadMoreBgColor,
        "--wep-pagination-color": ReadMoreTextColor
      })
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "wep-prev",
    onClick: () => goToPage(currentPage - 1),
    disabled: currentPage === 1
  }, prevName), Array.from({
    length: totalPages
  }, (_, index) => {
    const pageNumber = index + 1;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      key: index + 1,
      onClick: () => goToPage(index + 1),
      className: currentPage === pageNumber ? "active" : ""
    }, index + 1);
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "wep-next",
    onClick: () => goToPage(currentPage + 1),
    disabled: currentPage === totalPages
  }, nextName));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WepPagination);

/***/ }),

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/pin.js");
/* harmony import */ var _hooks_useFeaturedImage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hooks/useFeaturedImage */ "./src/hooks/useFeaturedImage.js");
/* harmony import */ var _hooks_useCptNamesAndPostsByName__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hooks/useCptNamesAndPostsByName */ "./src/hooks/useCptNamesAndPostsByName.js");
/* harmony import */ var _layouts_Slider_Slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./layouts/Slider/Slider */ "./src/layouts/Slider/Slider.jsx");
/* harmony import */ var _layouts_grid_Grid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./layouts/grid/Grid */ "./src/layouts/grid/Grid.jsx");
/* harmony import */ var _layouts_Masanory_MasanoryLayout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./layouts/Masanory/MasanoryLayout */ "./src/layouts/Masanory/MasanoryLayout.jsx");
/* harmony import */ var _layouts_Overlay_OverlayLayout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./layouts/Overlay/OverlayLayout */ "./src/layouts/Overlay/OverlayLayout.jsx");
/* harmony import */ var _layouts_listingTwo_ListingLayoutTwo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./layouts/listingTwo/ListingLayoutTwo */ "./src/layouts/listingTwo/ListingLayoutTwo.jsx");
/* harmony import */ var _layouts_listing_ListingLayout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./layouts/listing/ListingLayout */ "./src/layouts/listing/ListingLayout.jsx");
/* harmony import */ var _hooks_useSortedData__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./hooks/useSortedData */ "./src/hooks/useSortedData.js");
/* harmony import */ var _components_WepPagination__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/WepPagination */ "./src/components/WepPagination.jsx");




















function Edit({
  attributes,
  setAttributes
}) {
  const {
    showImgToggler,
    showContent,
    showMeta,
    showPostTitle,
    numPostsToShow,
    selectedCustomPostType,
    wordsLimit,
    widthPercentage,
    valueForWidth,
    customTaxonomyPosts,
    sortBy,
    imageUrl,
    ImgWidth,
    height,
    contentType,
    widthController,
    totalColoms,
    columnGap,
    rowGap,
    PaginationOnToggler,
    prevName,
    nextName,
    commaSeparatedIds,
    RemoveCommaSeparatedIds,
    selectedLayout,
    paginationAline,
    showReadMoreToggler,
    ReadMoreBgColor,
    ReadMoreTextColor,
    button_Right_Left_Padding,
    button_Top_bottom_Padding,
    title_Manage_styling,
    title_font_size,
    Meta_Manage_styling,
    Meta_font_size,
    Content_Manage_styling,
    Content_font_size,
    Read_more_font_size,
    customCSS,
    ReadMoreText
  } = attributes;
  const [page, setPage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1); // Current page state
  const perPage = numPostsToShow; // Posts per page
  const [errNotice, setErrNotice] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("tab1");
  const [withImagePosts, setWithImagePosts] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [tempCSS, setTempCSS] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(customCSS || "");
  const handleApplyCSS = () => {
    setAttributes({
      ...attributes,
      customCSS: tempCSS
    });
  };

  // Function to remove the applied CSS
  const handleRemoveApplyCSS = () => {
    setTempCSS("");
    setAttributes({
      ...attributes,
      customCSS: ""
    }); // Clear the saved customCSS
  };
  const {
    data,
    setData,
    fetchCustomTaxonomyIdsBytermName,
    handleSelectedCustomPostType,
    fetchPostsByIds,
    customPostsOptionsResponse,
    isLoading
  } = (0,_hooks_useCptNamesAndPostsByName__WEBPACK_IMPORTED_MODULE_5__["default"])({
    attributes,
    setAttributes
  });
  const {
    handleAlignmentChange,
    handleWidthChange,
    handleResolutionChange,
    handleHeightChange,
    getMaxHeightAndWidth,
    alignment,
    toggleGroupControlState
  } = (0,_hooks_useFeaturedImage__WEBPACK_IMPORTED_MODULE_4__["default"])({
    attributes,
    setAttributes
  });
  const truncateContent = (excerpt, limit) => {
    const words = excerpt?.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    } else {
      return excerpt;
    }
  };
  // Call the custom hook with data, sortBy, and setData
  (0,_hooks_useSortedData__WEBPACK_IMPORTED_MODULE_12__["default"])(data, sortBy, setData);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setAttributes({
      ...attributes,
      height: height,
      showImgToggler: showImgToggler,
      showContent: showContent,
      showPostTitle: showPostTitle,
      showMeta: showMeta
    });
  }, [data, valueForWidth, height]);

  //Fetch Include-Posts:
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (commaSeparatedIds.length > 0) {
      fetchPostsByIds(commaSeparatedIds);
    }
  }, [commaSeparatedIds, RemoveCommaSeparatedIds]);

  // Set ErrNotification:
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Helper function to clean and sort an array of IDs
    const cleanAndSortIds = arr => {
      return arr.map(id => id.replace(/\D/g, "")) // Remove non-numeric characters
      .filter(id => id !== "") // Remove empty strings
      .map(id => Number(id)) // Convert to numbers
      .sort((a, b) => a - b); // Sort numerically
    };

    // Clean and sort IDs from comma-separated strings
    const cleanedCommaIds = cleanAndSortIds(commaSeparatedIds);
    const cleanedRemoveIds = cleanAndSortIds(RemoveCommaSeparatedIds);

    // Remove duplicates
    const uniqueCommaIds = [...new Set(cleanedCommaIds)];
    const uniqueRemoveIds = [...new Set(cleanedRemoveIds)];

    // Check if the arrays are equal
    const arraysAreEqual = uniqueCommaIds.length > 0 && uniqueRemoveIds.length > 0 && uniqueCommaIds.length === uniqueRemoveIds.length && uniqueCommaIds.every((id, index) => id === uniqueRemoveIds[index]);
    if (arraysAreEqual) {
      setErrNotice(true);
    } else {
      setErrNotice(false);
    }
  }, [RemoveCommaSeparatedIds]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (selectedLayout === "overlay-layout") {
      const updatedPosts = data.map(item => {
        // Flag for posts without images
        return {
          ...item,
          hasNoImage: !item.featured_image_url?.thumbnail // If no image, flag as 'no-image'
        };
      });
      setWithImagePosts(updatedPosts); // Update the state with flagged posts
    } else if (selectedLayout === "slider-layout") {
      // Filter out items without an image for the slider layout
      const withImagePosts = data.filter(item => item.featured_image_url?.thumbnail);
      setWithImagePosts(withImagePosts); // Update the state with filtered posts
    } else {
      setWithImagePosts(data); // Default: set the posts normally for other layouts
    }
  }, [selectedLayout, data]); // Dependencies

  // Exclude Posts From FinalData(data):
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let newData = [];
    if (RemoveCommaSeparatedIds.length > 0) {
      // Filter data to exclude IDs in RemoveCommaSeparatedIds
      newData = data.filter(item => !RemoveCommaSeparatedIds.includes(item.id.toString()));
      if (JSON.stringify(newData) !== JSON.stringify(data)) {
        // Update state with the filtered data only if it has changed
        setData(newData);
      }
    }
  }, [data, RemoveCommaSeparatedIds]); // Dependencies to trigger effect

  // Define the component based on viewType
  let DynamicComponent;
  switch (selectedLayout) {
    case "slider-layout":
      DynamicComponent = _layouts_Slider_Slider__WEBPACK_IMPORTED_MODULE_6__["default"];
      break;
    case "overlay-layout":
      DynamicComponent = _layouts_Overlay_OverlayLayout__WEBPACK_IMPORTED_MODULE_9__["default"];
      break;
    case "listing-layout":
      DynamicComponent = _layouts_listing_ListingLayout__WEBPACK_IMPORTED_MODULE_11__["default"];
      break;
    case "listing-layout-two":
      DynamicComponent = _layouts_listingTwo_ListingLayoutTwo__WEBPACK_IMPORTED_MODULE_10__["default"];
      break;
    case "grid-layout":
      DynamicComponent = _layouts_grid_Grid__WEBPACK_IMPORTED_MODULE_7__["default"];
      break;
    case "masanory-layout":
    default:
      DynamicComponent = _layouts_Masanory_MasanoryLayout__WEBPACK_IMPORTED_MODULE_8__["default"];
      break;
  }

  // Handle tab change
  const handleTabChange = newTab => {
    setActiveTab(newTab);
  };
  const handleSort = selectedSortBy => {
    setAttributes({
      ...attributes,
      sortBy: selectedSortBy
    });
  };
  const handleIncludePosts = value => {
    if (!value.trim()) {
      setErrNotice(false);
      setAttributes({
        commaSeparatedIds: []
      });
    } else {
      const idsArray = value.split(",");
      setPage(1);
      setAttributes({
        ...attributes,
        commaSeparatedIds: idsArray
      });
    }
  };
  const handleExcludePosts = value => {
    if (value.trim()) {
      const idsArray = value.split(",");
      setAttributes({
        ...attributes,
        RemoveCommaSeparatedIds: idsArray
      });
    } else {
      setPage(1);
      setAttributes({
        ...attributes,
        RemoveCommaSeparatedIds: []
      });
    }
  };
  const handleChangeLayout = layout => {
    setAttributes({
      ...attributes,
      selectedLayout: layout
    });
  };
  const alinePagination = value => {
    setAttributes({
      ...attributes,
      paginationAline: value
    });
  };
  const selectedCustomPost = selectedCustomPostType === "Posts" ? "post" : selectedCustomPostType === "Pages" ? "page" : selectedCustomPostType.toLowerCase();
  const lowercaseSelectedCpt = customPostsOptionsResponse?.post_type_and_taxonomies?.[selectedCustomPost];

  // Pagination Data:
  const dataWithImages = withImagePosts.length > 0 ? withImagePosts : data;
  const paginatedData = PaginationOnToggler ? Array.isArray(dataWithImages) ? dataWithImages.slice((page - 1) * perPage, page * perPage) : [] : Array.isArray(dataWithImages) ? dataWithImages.slice(0, numPostsToShow) : [];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)()
  }, errNotice ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Notice, {
    status: "error",
    isDismissible: false
  }, "Please ensure IDs are not included in both the include and exclude lists.") : isLoading ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Placeholder, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Advanced Posts Listing", "advanced-posts-listing")
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Spinner, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Loading...", "advanced-posts-listing")))) : data?.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Placeholder, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__["default"],
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Advanced Posts Listing", "advanced-posts-listing")
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("No posts were found.", "advanced-posts-listing"))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DynamicComponent, {
    paginatedData: paginatedData,
    numPostsToShow: numPostsToShow,
    showImgToggler: showImgToggler,
    showPostTitle: showPostTitle,
    showMeta: showMeta,
    showContent: showContent,
    contentType: contentType,
    truncateContent: truncateContent,
    wordsLimit: wordsLimit,
    imageUrl: imageUrl,
    valueForWidth: valueForWidth,
    widthPercentage: widthPercentage,
    widthController: widthController,
    ImgWidth: ImgWidth,
    height: height,
    columnGap: columnGap,
    rowGap: rowGap,
    totalColoms: totalColoms,
    __: _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__ // Ensure you pass any translation function or props needed
    ,
    ReadMoreBgColor: ReadMoreBgColor,
    showReadMoreToggler: showReadMoreToggler,
    ReadMoreTextColor: ReadMoreTextColor,
    button_Top_bottom_Padding: button_Top_bottom_Padding,
    button_Right_Left_Padding: button_Right_Left_Padding,
    title_Manage_styling: title_Manage_styling,
    title_font_size: title_font_size,
    Meta_Manage_styling: Meta_Manage_styling,
    Meta_font_size: Meta_font_size,
    Content_Manage_styling: Content_Manage_styling,
    Content_font_size: Content_font_size,
    Read_more_font_size: Read_more_font_size,
    customCSS: customCSS,
    ReadMoreText: ReadMoreText
  })), data.length > 0 && data.length > numPostsToShow && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pagination-control",
    style: {
      marginTop: rowGap,
      display: "flex",
      justifyContent: paginationAline
    }
  }, PaginationOnToggler && !errNotice && selectedLayout !== "slider-layout" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_WepPagination__WEBPACK_IMPORTED_MODULE_13__["default"], {
    attributes: attributes,
    totalItems: dataWithImages.length,
    itemsPerPage: perPage,
    onPageChange: newPage => setPage(newPage)
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TabPanel, {
    className: "my-tab-panel",
    tabs: [{
      name: "Layouts",
      title: "Layouts",
      className: "tab-two"
    }, {
      name: "General",
      title: "General",
      className: "tab-one"
    }, {
      name: "Elements",
      title: "Elements",
      className: "tab-two"
    }],
    activeTab: activeTab,
    onSelect: handleTabChange
  }, tab => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null))), activeTab === "Layouts" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Select Layout", "advanced-posts-listing"),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    className: "apgb-post-type",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Choose A Layout", "advanced-posts-listing"),
    value: selectedLayout,
    onChange: handleChangeLayout,
    options: [{
      label: "Listing Layout ",
      value: "listing-layout"
    }, {
      label: "Listing Layout Two",
      value: "listing-layout-two"
    }, {
      label: "Grid Layout",
      value: "grid-layout"
    }, {
      label: "Overlay Layout",
      value: "overlay-layout"
    }, {
      label: "Masonry Layout",
      value: "masonry-layout"
    }, {
      label: "Slider Layout",
      value: "slider-layout"
    }]
  }))), activeTab === "Layouts" && selectedLayout !== "slider-layout" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Layout Settings", "advanced-posts-listing"),
    initialOpen: false
  }, selectedLayout !== "listing-layout" && selectedLayout !== "slider-layout" && selectedLayout !== "listing-layout-two" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dashicons-before-range",
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    class: "dashicons dashicons-grid-view",
    style: {
      marginRight: "8px",
      marginTop: "-33px"
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rangeController",
    style: {
      flex: 1
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("No. Of Columns", "advanced-posts-listing"),
    value: totalColoms,
    max: 6,
    min: 1,
    onChange: value => {
      setAttributes({
        totalColoms: value
      });
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Set the number of columns to displayed in a row.", "advanced-posts-listing")
  }))), selectedLayout !== "listing-layout" && selectedLayout !== "slider-layout" && selectedLayout !== "listing-layout-two" && totalColoms > 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dashicons-before-range ",
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dashicons dashicons-arrow-right-alt",
    style: {
      marginRight: "8px",
      marginTop: "-33px"
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rangeController",
    style: {
      flex: 1
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Column Gap", "advanced-posts-listing"),
    value: parseInt(columnGap),
    max: 100,
    min: 1,
    onChange: value => {
      const updatedColomGap = `${value}px`;
      setAttributes({
        columnGap: updatedColomGap
      });
    },
    className: "custom-range-control",
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Set the space to be applied between columns.", "advanced-posts-listing")
  }))), selectedLayout !== "slider-layout" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dashicons-before-range",
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "dashicons dashicons-arrow-down-alt",
    style: {
      marginRight: "8px",
      marginTop: "-33px"
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "rangeController",
    style: {
      flex: 1
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Row Gap", "advanced-posts-listing"),
    value: parseInt(rowGap),
    max: 150,
    min: 1,
    onChange: value => {
      const updatedRowGap = `${value}px`;
      setAttributes({
        rowGap: updatedRowGap
      });
    },
    className: "custom-range-control",
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Set the space to be applied between rows.", "advanced-posts-listing")
  }))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, activeTab === "Layouts" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Custom CSS", "advanced-posts-listing"),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextareaControl, {
    __nextHasNoMarginBottom: true,
    help: "Enter custom CSS",
    onChange: value => setTempCSS(value) // Update tempCSS as the user types
    ,
    placeholder: "Enter your CSS here",
    value: tempCSS // Controlled value linked to tempCSS state
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isPrimary: true,
    onClick: handleApplyCSS
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Update CSS", "advanced-posts-listing")), tempCSS && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isSecondary: true,
    onClick: handleRemoveApplyCSS,
    className: "Remove-css"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Remove CSS", "advanced-posts-listing")))))), activeTab === "General" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Posts Count", "advanced-posts-listing"),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: "Number of Posts",
    value: numPostsToShow,
    min: 1,
    onChange: value => {
      setAttributes({
        numPostsToShow: value
      }); // Set numPostsToShow attribute
      setPage(1);
    },
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Set the maximum number of posts to display on the page", "advanced-posts-listing")
  }))), activeTab === "General" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Data Source", "advanced-posts-listing"),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    className: "apgb-post-type",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Post Type", "advanced-posts-listing"),
    value: selectedCustomPostType,
    onChange: handleSelectedCustomPostType,
    options: [{
      label: "Posts",
      value: "Posts"
    }, {
      label: "Pages",
      value: "Pages"
    }, ...(customPostsOptionsResponse && Object.keys(customPostsOptionsResponse.cpt_list || {}).map(key => ({
      label: customPostsOptionsResponse.cpt_list[key],
      value: key
    })))]
  }), lowercaseSelectedCpt?.filter(taxonomy => taxonomy.label !== "Pattern Categories" && taxonomy.label !== "Navigation Menus" && taxonomy.label !== "Formats").map((taxonomy, index) => {
    const lowercaseType = taxonomy.label === "Categories" ? "categories" : taxonomy.label === "Tags" ? "tags" : taxonomy?.slug.toLowerCase();
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.FormTokenField, {
      className: `apgb-filter-by-${taxonomy.label}`,
      key: taxonomy.label,
      name: lowercaseType,
      value: customTaxonomyPosts?.[lowercaseType] || [],
      label: taxonomy.label,
      onChange: term => {
        fetchCustomTaxonomyIdsBytermName(term, lowercaseType, index);
      }
    });
  }))), activeTab === "Elements" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Post Title", "advanced-posts-listing"),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    checked: showPostTitle,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Display Post Title", "advanced-posts-listing"),
    onChange: () => setAttributes({
      showPostTitle: !showPostTitle
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    checked: title_Manage_styling,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Manage Styling", "advanced-posts-listing"),
    onChange: () => setAttributes({
      title_Manage_styling: !title_Manage_styling
    })
  }), title_Manage_styling && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(" Font Size ", "advanced-posts-listing"),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Specify the font size using px, em, or rem (e.g., 15px, 20rem, 25em).", "advanced-posts-listing"),
    __nextHasNoMarginBottom: true,
    value: title_font_size,
    onChange: value => {
      setAttributes({
        title_font_size: value
      });
    }
  }))), activeTab === "Elements" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Post Content", "advanced-posts-listing"),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    checked: showContent,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Display Post Content", "advanced-posts-listing"),
    onChange: () => setAttributes({
      showContent: !showContent
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    checked: Content_Manage_styling,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Manage Styling", "advanced-posts-listing"),
    onChange: () => setAttributes({
      Content_Manage_styling: !Content_Manage_styling
    })
  }), Content_Manage_styling && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(" Font Size ", "advanced-posts-listing"),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Specify the font size using px, em, or rem (e.g., 15px, 20rem, 25em).", "advanced-posts-listing"),
    __nextHasNoMarginBottom: true,
    value: Content_font_size,
    onChange: value => {
      setAttributes({
        Content_font_size: value
      });
    }
  }), showContent && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RadioControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Display :", "advanced-posts-listing"),
    selected: contentType,
    options: [{
      label: "Display Excerpt",
      value: "Excerpt"
    }, {
      label: "Display Full Post Content",
      value: "Full-Post"
    }],
    onChange: newContentType => setAttributes({
      contentType: newContentType
    })
  }), contentType === "Excerpt" ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Max Number of Words", "advanced-posts-listing"),
    value: wordsLimit,
    min: 10,
    onChange: value => {
      setAttributes({
        wordsLimit: value
      });
    }
  }) : null))), activeTab === "Elements" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Post Meta", "advanced-posts-listing"),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    checked: showMeta,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Display Post Meta Info"),
    onChange: () => setAttributes({
      showMeta: !showMeta
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    checked: Meta_Manage_styling,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Manage Styling", "advanced-posts-listing"),
    onChange: () => setAttributes({
      Meta_Manage_styling: !Meta_Manage_styling
    })
  }), Meta_Manage_styling && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(" Font Size ", "advanced-posts-listing"),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Specify the font size using px, em, or rem (e.g., 15px, 20rem, 25em).", "advanced-posts-listing"),
    __nextHasNoMarginBottom: true,
    value: Meta_font_size,
    onChange: value => {
      setAttributes({
        Meta_font_size: value
      });
    }
  }))), activeTab === "Elements" && selectedLayout !== "overlay-layout" && selectedLayout !== "slider-layout" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Featured Image", "advanced-posts-listing"),
    initialOpen: false
  }, selectedLayout !== "slider-layout" && selectedLayout !== "overlay-layout" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    checked: showImgToggler,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Display Featured Image", "advanced-posts-listing"),
    onChange: () => setAttributes({
      showImgToggler: !showImgToggler
    })
  }), selectedLayout === "listing-layout" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      gap: "10px"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalNumberControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Width", "advanced-posts-listing"),
    value: parseInt(valueForWidth ? widthPercentage : ImgWidth) // ParseInt to ensure numerical value
    ,
    max: getMaxHeightAndWidth(attributes.imageUrl) // ParseInt for max value
    ,
    onChange: handleWidthChange
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalNumberControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Height", "advanced-posts-listing"),
    value: parseInt(valueForWidth ? widthPercentage : height) // ParseInt to ensure numerical value
    ,
    max: getMaxHeightAndWidth(attributes.imageUrl) // ParseInt for max value
    ,
    onChange: handleHeightChange
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalToggleGroupControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("IMAGE SIZE (%)", "advanced-posts-listing"),
    value: toggleGroupControlState === true ? "center" : alignment,
    style: {
      width: "230px"
    },
    onChange: handleAlignmentChange,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Select the image size as a percentage.", "advanced-posts-listing")
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalToggleGroupControlOption, {
    value: "left",
    label: "25%"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalToggleGroupControlOption, {
    value: "center",
    label: "50%"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalToggleGroupControlOption, {
    value: "right",
    label: "75%"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalToggleGroupControlOption, {
    value: "justify",
    label: "100%"
  }))))))), activeTab === "Elements" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Buttons", "advanced-posts-listing"),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    checked: showReadMoreToggler,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Enable Custom Styling", "advanced-posts-listing"),
    onChange: () => setAttributes({
      showReadMoreToggler: !showReadMoreToggler
    })
  }), showReadMoreToggler && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "Read-more-Text "
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Text Color:", "advanced-posts-listing")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPalette, {
    value: ReadMoreTextColor,
    onChange: newColor => {
      setAttributes({
        ReadMoreTextColor: newColor
      });
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "Read-more-Text "
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Background Color:", "advanced-posts-listing")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPalette, {
    value: ReadMoreBgColor,
    onChange: newColor => {
      setAttributes({
        ReadMoreBgColor: newColor
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Top-Bottom Padding", "advanced-posts-listing"),
    value: parseInt(button_Top_bottom_Padding),
    onChange: value => {
      const updatedTopBottom = `${value}px`;
      setAttributes({
        button_Top_bottom_Padding: updatedTopBottom
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Left-Right Padding", "advanced-posts-listing"),
    value: parseInt(button_Right_Left_Padding),
    onChange: value => {
      const updatedRightLeft = `${value}px`;
      setAttributes({
        button_Right_Left_Padding: updatedRightLeft
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(" Font Size ", "advanced-posts-listing"),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Specify the font size using px, em, or rem (e.g., 15px, 20rem, 25em).", "advanced-posts-listing"),
    __nextHasNoMarginBottom: true,
    value: Read_more_font_size,
    onChange: value => {
      setAttributes({
        Read_more_font_size: value
      });
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(" Update Button label ", "advanced-posts-listing"),
    __nextHasNoMarginBottom: true,
    value: ReadMoreText,
    onChange: value => {
      setAttributes({
        ReadMoreText: value
      });
    }
  }))), activeTab === "General" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Posts Sorting", "advanced-posts-listing"),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("SORT BY", "advanced-posts-listing"),
    options: [{
      label: "Newest To Oldest",
      value: "new-to-old"
    }, {
      label: "Oldest To Newest",
      value: "old-to-new"
    }, {
      label: "A - Z",
      value: "A-Z"
    }, {
      label: "Z - A",
      value: "Z-A"
    }],
    value: sortBy,
    onChange: handleSort
  })))), activeTab === "General" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Include & Exclude Posts", "advanced-posts-listing"),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("INCLUDE POSTS", "advanced-posts-listing"),
    value: commaSeparatedIds,
    onChange: handleIncludePosts,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Enter the comma seperated ids of posts Ex: 23,45,16 to be included. Only these will be displayed.", "advanced-posts-listing")
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("EXCLUDE POSTS", "advanced-posts-listing"),
    value: RemoveCommaSeparatedIds.join(","),
    onChange: handleExcludePosts,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Enter the comma seperated ids of posts to be excluded from result set Ex: 23,45", "advanced-posts-listing")
  }))), activeTab === "General" && selectedLayout !== "slider-layout" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Pagination Settings", "advanced-posts-listing"),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    checked: !!PaginationOnToggler,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Turn on pagination", "advanced-posts-listing"),
    onChange: () => setAttributes({
      PaginationOnToggler: !PaginationOnToggler
    })
  }), PaginationOnToggler && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Add Prev Label", "advanced-posts-listing"),
    value: prevName,
    onChange: value => setAttributes({
      prevName: value
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Text for the previous page button.", "advanced-posts-listing")
  }), PaginationOnToggler && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Add Next Label", "advanced-posts-listing"),
    value: nextName,
    onChange: value => setAttributes({
      nextName: value
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Text for the next page button.", "advanced-posts-listing")
  }), PaginationOnToggler && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalToggleGroupControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Pagination Alignment", "advanced-posts-listing"),
    value: paginationAline,
    style: {
      width: "230px"
    },
    onChange: alinePagination,
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Select the alignment for pagination controls.", "advanced-posts-listing")
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalToggleGroupControlOption, {
    value: "left",
    label: "Left"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalToggleGroupControlOption, {
    value: "center",
    label: "Center"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.__experimentalToggleGroupControlOption, {
    value: "right",
    label: "Right"
  })))))));
}

/***/ }),

/***/ "./src/hooks/useCptNamesAndPostsByName.js":
/*!************************************************!*\
  !*** ./src/hooks/useCptNamesAndPostsByName.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useCptNamesAndPostsByName = ({
  attributes,
  setAttributes
}) => {
  const {
    updatedCptIds,
    customTaxonomyPosts,
    selectedCustomPostType,
    commaSeparatedIds,
    RemoveCommaSeparatedIds,
    selectedLayout
  } = attributes;
  const [currentSelectedCpt, setCurrentSelectedCpt] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [restUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(aplb_server_data?.rest_url);
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [customPostsOptionsResponse, setCustomPostsOptionsResponse] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (commaSeparatedIds.length === 0 && updatedCptIds.length === 0) {
      fetchPostsBySelectedCustomPostsType();
    }
  }, [selectedCustomPostType, updatedCptIds, commaSeparatedIds, RemoveCommaSeparatedIds]);

  //Show Cpt-List on load:
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchCptList();
  }, []);

  // Change SelectedOption from selectBox:
  const handleSelectedCustomPostType = value => {
    setCurrentSelectedCpt(value);
    // Create a copy of customTaxonomyPosts attribute
    const updatedCustomTaxonomyPosts = {
      ...customTaxonomyPosts
    };

    // Remove properties related to taxonomy types
    Object.keys(updatedCustomTaxonomyPosts).forEach(item => {
      delete updatedCustomTaxonomyPosts[item];
    });

    // Update the selected custom post type attribute
    setAttributes({
      ...attributes,
      selectedCustomPostType: value,
      customTaxonomyPosts: updatedCustomTaxonomyPosts,
      updatedCptIds: [] // Set updatedCptIds to an empty array
    });
  };
  const fetchCptList = async () => {
    try {
      const response = await fetch(`${restUrl}wpppro/v1/list-cpt`);
      const customPostsOptionsResponce = await response.json();
      setCustomPostsOptionsResponse(customPostsOptionsResponce);
      // setAttributes({ ...attributes, customPostsOptions: customPostsOptionsResponce });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchPostsBySelectedCustomPostsType = async () => {
    setIsLoading(true); // Set loading to true when starting fetch
    try {
      let post_type = selectedCustomPostType.toLowerCase();
      const separator = restUrl.includes('?') ? '&' : '?';
      let query = `${restUrl}wp/v2/${post_type}${separator}per_page=100`;
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error(`Failed to fetch data (${response.status} ${response.statusText})`);
      }
      const responseData = await response.json();

      // Ensure responseData is always an array
      const allPostsResponse = Array.isArray(responseData) ? responseData : [responseData];
      if (selectedCustomPostType) {
        setData(allPostsResponse);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading to false once fetch is complete
    }
  };

  //Fetch taxonomy-Posts-Ids by name with dynamic pagination starting from page 1
  const fetchCustomTaxonomyIdsBytermName = async (term, taxonomyType) => {
    const customTaxonomyPosts = "customTaxonomyPosts";
    const perPage = 100; // Define the number of items per page
    let page = 1; // Initialize page number to 1
    let termIds = []; // Initialize an array to hold all token IDs
    const separator = restUrl.includes('?') ? '&' : '?';
    try {
      // Fetch data for the first page
      while (true) {
        const response = await fetch(`${restUrl}wp/v2/${taxonomyType}${separator}page=${page}&per_page=${perPage}`);
        if (!response.ok) {
          throw new Error("Failed to fetch custom taxonomies");
        }
        const responseData = await response.json();

        // Iterate over the response data to find matching term
        for (const TermName of term) {
          const matchedTermName = responseData.find(data => data.name === TermName);
          if (matchedTermName) {
            termIds.push(matchedTermName.id); // Push each token ID to the array
            // setUpdatedIdsState(false);
          } else {
            return; // Return here to stop further execution
          }
        }

        // If termIds are found or there's no more data, exit the loop
        if (termIds.length > 0 || responseData.length < perPage) {
          break;
        }

        // Increment the page number for the next iteration
        page++;
      }

      // Construct the updated ids array with new IDs and taxonomyType
      const updatedIds = updatedCptIds?.filter(item => item.taxonomyType !== taxonomyType); // Remove existing IDs for the same taxonomyType  

      termIds.forEach(tokenId => {
        updatedIds.push({
          ids: tokenId,
          taxonomyType
        });
      });
      // Update the custom taxonomy posts attribute
      const Cpt = {
        ...attributes[customTaxonomyPosts],
        [taxonomyType]: term
      };
      setAttributes({
        ...attributes,
        [customTaxonomyPosts]: Cpt,
        updatedCptIds: updatedIds
      });
    } catch (error) {
      console.error("Error fetching custom taxonomy data:", error);
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (commaSeparatedIds.length === 0) {
      fetchCustomTaxonomyPostsByIds(updatedCptIds);
    }
  }, [updatedCptIds, commaSeparatedIds, RemoveCommaSeparatedIds]);
  const fetchCustomTaxonomyPostsByIds = async updatedCptIds => {
    try {
      const uniquePostIds = new Set();

      // Fetch posts for all IDs concurrently
      const fetchPromises = updatedCptIds.map(async ({
        ids: termIds,
        taxonomyType
      }) => {
        let post_type = selectedCustomPostType.toLowerCase();
        const response = await fetch(`${restUrl}wp/v2/${post_type}?${taxonomyType}=${termIds}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch posts for IDs: ${termIdsArray.join(",")}`);
        }
        const responseData = await response.json();

        // Filter out posts that are already fetched
        const uniquePosts = responseData.filter(post => !uniquePostIds.has(post.id));

        // Add the IDs of newly fetched posts to the set
        uniquePosts.forEach(post => uniquePostIds.add(post.id));
        return uniquePosts;
      });

      // Wait for all fetch requests to complete
      const responseDataArray = await Promise.all(fetchPromises);

      // Merge all fetched data into a single array
      const mergedData = responseDataArray.reduce((acc, data) => acc.concat(data), []);

      // Filter the merged data to include only posts that match all term
      const filteredData = mergedData.filter(post => {
        // Check if the post contains all selected custom taxonomies
        const customTaxonomiesMatch = updatedCptIds.every(({
          taxonomyType,
          ids
        }) => {
          // Ensure post[taxonomyType] is defined before accessing the includes method
          return post[taxonomyType] && post[taxonomyType].includes(ids);
        });
        // Return true if all custom taxonomies match
        return customTaxonomiesMatch;
      });

      // Compare filteredData with current data using JSON.stringify
      if (JSON.stringify(filteredData) !== JSON.stringify(data)) {
        if (filteredData.length > 0) {
          setData(filteredData); // Update state if filteredData is different
        } else {
          setData([]); // Clear data if filteredData is empty
        }
      }
    } catch (error) {
      console.error("Error fetching posts by custom taxonomy:", error);
    }
  };
  const fetchPostsByIds = async () => {
    try {
      // const apiUrl = `${restUrl}wp/v2/posts?include=${commaSeparatedIds}`;
      const apiUrl = `${restUrl}wpppro/v1/get-post-by-id?id=${commaSeparatedIds}`;
      const response = await fetch(apiUrl);
      const jsonData = await response.json();

      // Compare the fetched data with the current data using JSON.stringify
      if (JSON.stringify(jsonData) !== JSON.stringify(data)) {
        setData(jsonData); // Update state with the fetched data if it has changed
      }
    } catch (error) {
      console.error('Error fetching posts by IDs:', error);
    }
  };
  return {
    isLoading,
    data,
    setData,
    fetchCptList,
    fetchCustomTaxonomyIdsBytermName,
    handleSelectedCustomPostType,
    fetchPostsBySelectedCustomPostsType,
    fetchPostsByIds,
    currentSelectedCpt,
    customPostsOptionsResponse
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useCptNamesAndPostsByName);

/***/ }),

/***/ "./src/hooks/useFeaturedImage.js":
/*!***************************************!*\
  !*** ./src/hooks/useFeaturedImage.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useFeaturedImage = ({
  attributes,
  setAttributes
}) => {
  const [valueForWidth, setValueForWidth] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [toggleGroupControlState, settoggleGroupControlState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [widthController, setWidthController] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [alignment, setAlignment] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const handleResolutionChange = selectedResolution => {
    settoggleGroupControlState(true);
    // Set ImgWidth based on selected resolution
    let newWidth;
    let newHeight;
    switch (selectedResolution) {
      case "thumbnail":
        newWidth = 150;
        newHeight = 150;
        break;
      case "medium":
        newWidth = 300;
        newHeight = 300;
        break;
      case "large":
        newWidth = 1024;
        newHeight = 1024;
        break;
      default:
        newWidth = attributes?.ImgWidth;
        newHeight = attributes?.height;
        break;
    }

    // Convert to strings with "px" appended for CSS properties
    const widthString = `${newWidth}px`;
    const heightString = `${newHeight}px`;
    setValueForWidth(false);
    setWidthController(false);
    setAttributes({
      ...attributes,
      ImgWidth: widthString,
      height: heightString,
      imageUrl: selectedResolution,
      valueForWidth: false,
      selectedImageTogggler: true,
      widthPercentageState: false,
      widthController: false
    });
  };

  // Function to handle width change
  const handleWidthChange = newWidth => {
    setValueForWidth(false);
    setWidthController(true);
    const updatedWidth = `${newWidth}px`;
    setAttributes({
      ...attributes,
      ImgWidth: updatedWidth,
      valueForWidth: valueForWidth,
      selectedImageTogggler: false,
      widthPercentageState: false,
      widthController: true
    });
  };

  // Function to handle height change
  const handleHeightChange = newHeight => {
    setValueForWidth(false);
    settoggleGroupControlState(false);
    setWidthController(true);
    const updatedHeight = `${newHeight}px`;
    setAttributes({
      ...attributes,
      height: updatedHeight,
      valueForWidth: valueForWidth,
      selectedImageTogggler: false,
      widthPercentageState: false,
      widthController: true
    });
  };
  const handleAlignmentChange = alignment => {
    setAlignment(alignment);
    let widthPercentage;
    const imgWidth = getImageWidth(attributes.imageUrl); // Get the appropriate width based on the imageUrl
    switch (alignment) {
      case "left":
        widthPercentage = imgWidth * 0.25 + "px"; // 25% of the image width
        break;
      case "center":
        widthPercentage = imgWidth * 0.5 + "px"; // 50% of the image width
        break;
      case "right":
        widthPercentage = imgWidth * 0.75 + "px"; // 75% of the image width
        break;
      case "justify":
        widthPercentage = imgWidth + "px"; // 100% of the image width
        break;
      default:
        widthPercentage = imgWidth + "px"; // Default to 100% of the image width
        break;
    }
    settoggleGroupControlState(false);
    setValueForWidth(true);
    setWidthController(false);
    setAttributes({
      ...attributes,
      widthPercentage: widthPercentage,
      valueForWidth: true,
      selectedImageTogggler: false,
      widthPercentageState: true,
      widthController: false
    });
  };
  const getImageWidth = imageUrl => {
    switch (imageUrl) {
      case "thumbnail":
        return 150;
      // Thumbnail width
      case "medium":
        return 300;
      // Medium width
      case "large":
        return 1024;
      // Large width
      default:
        return 1024;
      // Default to large width if imageUrl is not recognized
    }
  };
  const getMaxHeightAndWidth = imageUrl => {
    switch (imageUrl) {
      case "thumbnail":
        return 150;
      case "medium":
        return 300;
      case "large":
        return 1024;
      default:
        return 1024;
      // Default max value
    }
  };
  return {
    getMaxHeightAndWidth,
    handleAlignmentChange,
    handleWidthChange,
    handleResolutionChange,
    handleHeightChange,
    toggleGroupControlState,
    widthController,
    alignment
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useFeaturedImage);

/***/ }),

/***/ "./src/hooks/useSortedData.js":
/*!************************************!*\
  !*** ./src/hooks/useSortedData.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useSortedData = (data, sortBy, setData) => {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const sortData = (data, sortBy) => {
      if (!Array.isArray(data)) {
        console.error("data is not an array");
        return [];
      }
      const sortedData = [...data];
      if (sortBy === "new-to-old") {
        sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (sortBy === "old-to-new") {
        sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else if (sortBy === "A-Z") {
        sortedData.sort((a, b) => {
          const titleA = a.title.rendered ? a.title.rendered.toLowerCase() : '';
          const titleB = b.title.rendered ? b.title.rendered.toLowerCase() : '';
          return titleA.localeCompare(titleB);
        });
      } else if (sortBy === "Z-A") {
        sortedData.sort((a, b) => {
          const titleA = a.title.rendered ? a.title.rendered.toLowerCase() : '';
          const titleB = b.title.rendered ? b.title.rendered.toLowerCase() : '';
          return titleB.localeCompare(titleA);
        });
      }
      return sortedData;
    };
    const newSortedData = sortData(data, sortBy);

    // Compare newSortedData with the current data using JSON.stringify
    if (JSON.stringify(newSortedData) !== JSON.stringify(data)) {
      setData(newSortedData); // Update state if newSortedData is different
    }
  }, [data, sortBy, setData]);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useSortedData);

/***/ }),

/***/ "./src/layouts/Masanory/MasanoryLayout.jsx":
/*!*************************************************!*\
  !*** ./src/layouts/Masanory/MasanoryLayout.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MasanoryLayoutmodule_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MasanoryLayoutmodule.css */ "./src/layouts/Masanory/MasanoryLayoutmodule.css");



const MasanoryLayout = ({
  paginatedData,
  numPostsToShow,
  showImgToggler,
  showPostTitle,
  showMeta,
  showContent,
  contentType,
  truncateContent,
  wordsLimit,
  imageUrl,
  valueForWidth,
  widthPercentage,
  widthController,
  ImgWidth,
  height,
  columnGap,
  rowGap,
  totalColoms,
  ReadMoreBgColor,
  showReadMoreToggler,
  ReadMoreTextColor,
  button_Right_Left_Padding,
  button_Top_bottom_Padding,
  title_font_size,
  Meta_font_size,
  Content_font_size,
  Read_more_font_size,
  customCSS,
  __,
  // Placeholder for translation function
  Content_Manage_styling,
  title_Manage_styling,
  Meta_Manage_styling,
  ReadMoreText
}) => {
  const [columnCount, setColumnCount] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const updateColumnCount = () => {
    const width = window.innerWidth;
    let columns = totalColoms || 1;
    if (width <= 575) {
      columns = 1; // Mobile screens
    } else if (width >= 576 && width < 992) {
      columns = 2; // Small screens
    } else if (width >= 992 && width < 1200) {
      columns = totalColoms || 3; // Medium screens
    } else if (width >= 1200) {
      columns = totalColoms || 4; // Large screens
    }
    setColumnCount(columns);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    updateColumnCount(); // Set initial column count
    window.addEventListener("resize", updateColumnCount); // Update column count on resize

    return () => {
      window.removeEventListener("resize", updateColumnCount); // Clean up the event listener
    };
  }, [totalColoms]);
  const masonry = paginatedData.slice(0, numPostsToShow);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wep-root"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "masonry-layout",
    style: {
      columnGap: columnGap || "30px",
      // Inline column gap with default value

      columnCount: columnCount
    }
  }, customCSS && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, customCSS), masonry.map(item => {
    const formattedDate = new Date(item?.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    let featuredImgExist = false;
    if (item.hasOwnProperty("featured_image_url")) {
      const featuredImageUrlObj = item.featured_image_url;
      if (featuredImageUrlObj && typeof featuredImageUrlObj === "object" && Object.keys(featuredImageUrlObj).length > 0) {
        featuredImgExist = true;
      }
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: item.id,
      className: "wep-card",
      style: {
        marginBottom: rowGap || "30px" // Inline column gap with default value
      }
    }, showImgToggler && item?.featured_image_url && featuredImgExist && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-img"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.featured_image_url[imageUrl]
    }), item.assigned_categories && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "wep-chip"
    }, item.assigned_categories)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-heading"
    }, showPostTitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
      className: "wep-card-title",
      style: {
        ...(title_Manage_styling && {
          fontSize: title_font_size
        })
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link,
      dangerouslySetInnerHTML: {
        __html: item?.title.rendered
      }
    })), showMeta && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "meta-data",
      style: {
        ...(Meta_Manage_styling && {
          fontSize: Meta_font_size
        })
      }
    }, formattedDate && `${formattedDate} `, item.post_author && `| Author: ${item.post_author} `, item.assigned_categories && `| Categories: ${item.assigned_categories} `)), showContent && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        ...(Content_Manage_styling && {
          fontSize: Content_font_size
        })
      },
      className: "wep-card-text",
      dangerouslySetInnerHTML: {
        __html: contentType === "Full-Post" ? item?.content?.rendered : !item?.excerpt?.rendered ? truncateContent(item?.content?.rendered, wordsLimit) : truncateContent(item?.excerpt?.rendered, wordsLimit)
      }
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-footer"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link,
      target: "_blank",
      className: "wep-btn wep-btn-primary",
      style: {
        ...(showReadMoreToggler && {
          "--wep-btn-bg": ReadMoreBgColor,
          "--wep-btn-hover-bg": `color-mix(in srgb, ${ReadMoreBgColor}, black 20%)`,
          "--wep-btn-color": ReadMoreTextColor,
          "--wep-btn-hover-color": ReadMoreTextColor,
          "--wep-btn-padding-y": button_Top_bottom_Padding,
          "--wep-btn-padding-x": button_Right_Left_Padding,
          "--wep-btn-font-size": Read_more_font_size
        })
      }
    }, __(ReadMoreText || 'Read More', "advanced-posts-listing"))));
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MasanoryLayout);

/***/ }),

/***/ "./src/layouts/Overlay/OverlayLayout.jsx":
/*!***********************************************!*\
  !*** ./src/layouts/Overlay/OverlayLayout.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _OverlayLayout_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OverlayLayout.css */ "./src/layouts/Overlay/OverlayLayout.css");



const OverlayLayout = ({
  paginatedData,
  numPostsToShow,
  showImgToggler,
  showPostTitle,
  showMeta,
  showContent,
  contentType,
  truncateContent,
  wordsLimit,
  imageUrl,
  valueForWidth,
  widthPercentage,
  widthController,
  ImgWidth,
  height,
  columnGap,
  rowGap,
  totalColoms,
  ReadMoreBgColor,
  showReadMoreToggler,
  ReadMoreTextColor,
  button_Top_bottom_Padding,
  button_Right_Left_Padding,
  __,
  // Placeholder for translation function
  title_font_size,
  Meta_font_size,
  Content_font_size,
  Read_more_font_size,
  customCSS,
  Content_Manage_styling,
  title_Manage_styling,
  Meta_Manage_styling,
  ReadMoreText
}) => {
  const overlayData = paginatedData.slice(0, numPostsToShow);

  // Function to calculate column width based on window width
  const getOverlayTemplateColumns = totalColoms => {
    const width = window.innerWidth;
    if (width >= 992 && width < 1200) {
      return `repeat(${totalColoms || 1}, 1fr)`;
    } else if (width >= 1200) {
      return `repeat(${totalColoms || 1}, 1fr)`;
    }
  };

  // State to manage overlay columns
  const [overlayColumns, setOverlayColumns] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(getOverlayTemplateColumns(totalColoms));
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleResize = () => {
      setOverlayColumns(getOverlayTemplateColumns(totalColoms));
    };
    window.addEventListener("resize", handleResize);
    // Initial setting
    setOverlayColumns(getOverlayTemplateColumns(totalColoms));
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [totalColoms]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wep-root"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "overlay-layout",
    style: {
      columnGap: columnGap || "20px",
      rowGap: rowGap || "20px",
      gridTemplateColumns: overlayColumns
    }
  }, customCSS && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, customCSS), overlayData.map(item => {
    const formattedDate = new Date(item?.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    let featuredImgExist = false;
    if (item.hasOwnProperty("featured_image_url")) {
      const featuredImageUrlObj = item.featured_image_url;
      if (featuredImageUrlObj && typeof featuredImageUrlObj === "object" && Object.keys(featuredImageUrlObj).length > 0) {
        featuredImgExist = true;
      }
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: item.id,
      className: "wep-card",
      style: {
        backgroundImage: `url(${item.featured_image_url[imageUrl]})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-img-overlay"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-heading"
    }, showPostTitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
      className: "wep-card-title",
      style: {
        ...(title_Manage_styling && {
          fontSize: title_font_size
        })
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link,
      dangerouslySetInnerHTML: {
        __html: item?.title.rendered
      }
    })), showMeta && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "meta-data",
      style: {
        ...(Meta_Manage_styling && {
          fontSize: Meta_font_size
        })
      }
    }, formattedDate && `${formattedDate} `, item.post_author && `| Author: ${item.post_author} `, item.assigned_categories && `| Categories: ${item.assigned_categories} `)), showContent && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        ...(Content_Manage_styling && {
          fontSize: Content_font_size
        })
      },
      className: "wep-card-text",
      dangerouslySetInnerHTML: {
        __html: contentType === "Full-Post" ? item?.content?.rendered : !item?.excerpt?.rendered ? truncateContent(item?.content?.rendered, wordsLimit) : truncateContent(item?.excerpt?.rendered, wordsLimit)
      }
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-footer"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link,
      target: "_blank",
      className: "wep-btn wep-btn-primary",
      style: {
        ...(showReadMoreToggler && {
          "--wep-btn-bg": ReadMoreBgColor,
          "--wep-btn-hover-bg": `color-mix(in srgb, ${ReadMoreBgColor}, black 20%)`,
          "--wep-btn-color": ReadMoreTextColor,
          "--wep-btn-hover-color": ReadMoreTextColor,
          "--wep-btn-padding-y": button_Top_bottom_Padding,
          "--wep-btn-padding-x": button_Right_Left_Padding,
          "--wep-btn-font-size": Read_more_font_size
        })
      }
    }, __(ReadMoreText || 'Read More', "advanced-posts-listing")))));
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OverlayLayout);

/***/ }),

/***/ "./src/layouts/Slider/Slider.jsx":
/*!***************************************!*\
  !*** ./src/layouts/Slider/Slider.jsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Slidermodule_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slidermodule.css */ "./src/layouts/Slider/Slidermodule.css");



const Slider = ({
  paginatedData,
  numPostsToShow,
  showImgToggler,
  showPostTitle,
  showMeta,
  showContent,
  contentType,
  truncateContent,
  wordsLimit,
  imageUrl,
  valueForWidth,
  widthPercentage,
  widthController,
  ImgWidth,
  height,
  ReadMoreBgColor,
  showReadMoreToggler,
  ReadMoreTextColor,
  button_Top_bottom_Padding,
  button_Right_Left_Padding,
  title_font_size,
  Meta_font_size,
  Content_font_size,
  Read_more_font_size,
  customCSS,
  __,
  Content_Manage_styling,
  title_Manage_styling,
  Meta_Manage_styling,
  ReadMoreText
}) => {
  const [currentIndex, setCurrentIndex] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const slides = paginatedData.slice(0, numPostsToShow);
  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
  };
  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + slides.length) % slides.length);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wep-root"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "slider-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "slider"
  }, customCSS && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, customCSS), slides.map((item, index) => {
    const formattedDate = new Date(item?.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    const featuredImgExist = item.featured_image_url && typeof item.featured_image_url === "object" && Object.keys(item.featured_image_url).length > 0;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: item.id,
      className: `slide ${index === currentIndex ? "active" : ""}`,
      style: {
        display: index === currentIndex ? "block" : "none"
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card"
    }, item.featured_image_url && featuredImgExist && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-img"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.featured_image_url[imageUrl],
      alt: item.title.rendered // Added alt text for accessibility
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-heading"
    }, showPostTitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
      className: "wep-card-title",
      style: {
        ...(title_Manage_styling && {
          fontSize: title_font_size
        })
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link,
      dangerouslySetInnerHTML: {
        __html: item.title.rendered
      }
    })), showMeta && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "meta-data",
      style: {
        ...(Meta_Manage_styling && {
          fontSize: Meta_font_size
        })
      }
    }, formattedDate && `${formattedDate} `, item.post_author && `| Author: ${item.post_author} `, item.assigned_categories && `| Categories: ${item.assigned_categories} `)), showContent && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-text",
      style: {
        ...(Content_Manage_styling && {
          fontSize: Content_font_size
        })
      },
      dangerouslySetInnerHTML: {
        __html: contentType === "Full-Post" ? item.content.rendered : !item.excerpt?.rendered ? truncateContent(item.content.rendered, wordsLimit) : truncateContent(item.excerpt.rendered, wordsLimit)
      }
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-footer"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link,
      target: "_blank",
      className: "wep-btn wep-btn-primary",
      style: {
        ...(showReadMoreToggler && {
          "--wep-btn-bg": ReadMoreBgColor,
          "--wep-btn-hover-bg": `color-mix(in srgb, ${ReadMoreBgColor}, black 20%)`,
          "--wep-btn-color": ReadMoreTextColor,
          "--wep-btn-hover-color": ReadMoreTextColor,
          "--wep-btn-padding-y": button_Top_bottom_Padding,
          "--wep-btn-padding-x": button_Right_Left_Padding,
          "--wep-btn-font-size": Read_more_font_size
        })
      }
    }, __(ReadMoreText || 'Read More', "advanced-posts-listing")))));
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "slider-button prev",
    onClick: prevSlide
  }, "\u276E"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "slider-button next",
    onClick: nextSlide
  }, "\u276F")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Slider);

/***/ }),

/***/ "./src/layouts/grid/Grid.jsx":
/*!***********************************!*\
  !*** ./src/layouts/grid/Grid.jsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Gridmodule_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gridmodule.css */ "./src/layouts/grid/Gridmodule.css");



const GridLayout = ({
  paginatedData,
  numPostsToShow,
  showImgToggler,
  showPostTitle,
  showMeta,
  showContent,
  contentType,
  truncateContent,
  wordsLimit,
  imageUrl,
  valueForWidth,
  widthPercentage,
  widthController,
  ImgWidth,
  height,
  columnGap,
  rowGap,
  totalColoms,
  ReadMoreBgColor,
  showReadMoreToggler,
  ReadMoreTextColor,
  button_Top_bottom_Padding,
  button_Right_Left_Padding,
  title_font_size,
  Meta_font_size,
  Content_font_size,
  Read_more_font_size,
  __,
  customCSS,
  title_Manage_styling,
  Content_Manage_styling,
  ReadMoreText,
  Meta_Manage_styling
}) => {
  const GridItems = paginatedData.slice(0, numPostsToShow);
  const getGridTemplateColumns = totalColoms => {
    const width = window.innerWidth;
    if (width >= 992 && width < 1200) {
      return `repeat(${totalColoms || 1}, 1fr)`;
    } else if (width >= 1200) {
      return `repeat(${totalColoms || 1}, 1fr)`;
    }
  };
  const [gridColumns, setGridColumns] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(getGridTemplateColumns());
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleResize = () => {
      setGridColumns(getGridTemplateColumns(totalColoms));
    };
    window.addEventListener("resize", handleResize);
    setGridColumns(getGridTemplateColumns(totalColoms));
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [totalColoms]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wep-root"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid-layout",
    style: {
      columnGap: columnGap || "30px",
      rowGap: rowGap || "30px",
      gridTemplateColumns: gridColumns
    }
  }, customCSS && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, customCSS), GridItems.map(item => {
    const formattedDate = new Date(item?.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    let featuredImgExist = false;
    if (item.hasOwnProperty("featured_image_url")) {
      const featuredImageUrlObj = item.featured_image_url;
      if (featuredImageUrlObj && typeof featuredImageUrlObj === "object" && Object.keys(featuredImageUrlObj).length > 0) {
        featuredImgExist = true;
      }
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: item.id,
      className: "wep-card"
    }, showImgToggler && item?.featured_image_url && featuredImgExist && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-img"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.featured_image_url[imageUrl]
    }), item.assigned_categories && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "wep-chip"
    }, item.assigned_categories)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-heading"
    }, showPostTitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
      className: "wep-card-title",
      style: {
        ...(title_Manage_styling && {
          fontSize: title_font_size
        })
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link,
      dangerouslySetInnerHTML: {
        __html: item?.title.rendered
      }
    })), showMeta && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "meta-data",
      style: {
        ...(Meta_Manage_styling && {
          fontSize: Meta_font_size
        })
      }
    }, formattedDate && `${formattedDate} `, item.post_author && `| Author: ${item.post_author}`)), showContent && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        ...(Content_Manage_styling && {
          fontSize: Content_font_size
        })
      },
      className: "wep-card-text",
      dangerouslySetInnerHTML: {
        __html: contentType === "Full-Post" ? item?.content?.rendered : !item?.excerpt?.rendered ? truncateContent(item?.content?.rendered, wordsLimit) : truncateContent(item?.excerpt?.rendered, wordsLimit)
      }
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-footer"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link,
      target: "_blank",
      className: "wep-btn wep-btn-primary",
      style: {
        ...(showReadMoreToggler && {
          "--wep-btn-bg": ReadMoreBgColor,
          "--wep-btn-hover-bg": `color-mix(in srgb, ${ReadMoreBgColor}, black 20%)`,
          "--wep-btn-color": ReadMoreTextColor,
          "--wep-btn-hover-color": ReadMoreTextColor,
          "--wep-btn-padding-y": button_Top_bottom_Padding,
          "--wep-btn-padding-x": button_Right_Left_Padding,
          "--wep-btn-font-size": Read_more_font_size
        })
      }
    }, __(ReadMoreText || 'Read More', "advanced-posts-listing"))));
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridLayout);

/***/ }),

/***/ "./src/layouts/listing/ListingLayout.jsx":
/*!***********************************************!*\
  !*** ./src/layouts/listing/ListingLayout.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ListingLayout_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListingLayout.css */ "./src/layouts/listing/ListingLayout.css");


const ListingLayout = ({
  paginatedData,
  numPostsToShow,
  showImgToggler,
  showPostTitle,
  showMeta,
  showContent,
  contentType,
  truncateContent,
  wordsLimit,
  imageUrl,
  valueForWidth,
  widthPercentage,
  widthController,
  ImgWidth,
  height,
  rowGap,
  ReadMoreBgColor,
  showReadMoreToggler,
  ReadMoreTextColor,
  button_Top_bottom_Padding,
  button_Right_Left_Padding,
  title_font_size,
  Meta_font_size,
  Content_font_size,
  Read_more_font_size,
  customCSS,
  Content_Manage_styling,
  Meta_Manage_styling,
  title_Manage_styling,
  ReadMoreText,
  __ // Placeholder for translation function
}) => {
  const Listing = paginatedData.slice(0, numPostsToShow);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "listing-layout"
  }, customCSS && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, customCSS), Listing.map(item => {
    const formattedDate = new Date(item?.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    let featuredImgExist = false;
    if (item.hasOwnProperty("featured_image_url")) {
      const featuredImageUrlObj = item.featured_image_url;
      if (featuredImageUrlObj && typeof featuredImageUrlObj === "object" && Object.keys(featuredImageUrlObj).length > 0) {
        featuredImgExist = true;
      }
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: item.id,
      className: "post-container",
      style: {
        marginBottom: rowGap
      }
    }, showImgToggler && item?.featured_image_url && featuredImgExist && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "image-container"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      className: "block-image",
      src: item.featured_image_url[imageUrl],
      style: {
        ...(valueForWidth ? {
          maxWidth: widthPercentage,
          maxHeight: widthPercentage
        } : {
          maxWidth: widthController === true ? ImgWidth : '',
          maxHeight: widthController === true ? height : ''
        })
      },
      alt: item.title.rendered // Added alt text for accessibility
    })), showPostTitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "post-title",
      style: {
        ...(title_Manage_styling && {
          fontSize: title_font_size
        })
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      className: "title",
      href: item.link,
      dangerouslySetInnerHTML: {
        __html: item?.title.rendered
      }
    })), showMeta && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "meta-data",
      style: {
        ...(Meta_Manage_styling && {
          fontSize: Meta_font_size
        })
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, formattedDate && `${formattedDate} `, item.post_author && `| Author: ${item.post_author} `, item.assigned_categories && `| Categories: ${item.assigned_categories} `)), showContent && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        ...(Content_Manage_styling && {
          fontSize: Content_font_size
        })
      },
      className: "post-content",
      dangerouslySetInnerHTML: {
        __html: contentType === "Full-Post" ? item?.content?.rendered : !item?.excerpt?.rendered ? truncateContent(item?.content?.rendered, wordsLimit) : truncateContent(item?.excerpt?.rendered, wordsLimit)
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "read-more-btn"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link,
      target: "_blank",
      className: "read-more-button",
      style: {
        ...(showReadMoreToggler && {
          backgroundColor: ReadMoreBgColor,
          color: ReadMoreTextColor,
          padding: `${button_Top_bottom_Padding} ${button_Right_Left_Padding}`,
          fontSize: Read_more_font_size
        })
      }
    }, __(ReadMoreText || 'Read More', "advanced-posts-listing"))));
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListingLayout);

/***/ }),

/***/ "./src/layouts/listingTwo/ListingLayoutTwo.jsx":
/*!*****************************************************!*\
  !*** ./src/layouts/listingTwo/ListingLayoutTwo.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ListingLayoutTwo_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListingLayoutTwo.css */ "./src/layouts/listingTwo/ListingLayoutTwo.css");


const ListingLayoutTwo = ({
  paginatedData,
  numPostsToShow,
  showImgToggler,
  showPostTitle,
  showMeta,
  showContent,
  contentType,
  truncateContent,
  wordsLimit,
  imageUrl,
  valueForWidth,
  widthPercentage,
  widthController,
  ImgWidth,
  height,
  rowGap,
  ReadMoreBgColor,
  showReadMoreToggler,
  ReadMoreTextColor,
  button_Top_bottom_Padding,
  button_Right_Left_Padding,
  title_font_size,
  Meta_font_size,
  Content_font_size,
  Read_more_font_size,
  customCSS,
  Content_Manage_styling,
  Meta_Manage_styling,
  title_Manage_styling,
  ReadMoreText,
  __ // Placeholder for translation function
}) => {
  const Listing = paginatedData.slice(0, numPostsToShow);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wep-root"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "listing-layout",
    style: {
      gap: rowGap
    }
  }, customCSS && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, customCSS), Listing.map(item => {
    const formattedDate = new Date(item?.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    let featuredImgExist = false;
    if (item.hasOwnProperty("featured_image_url")) {
      const featuredImageUrlObj = item.featured_image_url;
      if (featuredImageUrlObj && typeof featuredImageUrlObj === "object" && Object.keys(featuredImageUrlObj).length > 0) {
        featuredImgExist = true;
      }
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: item.id,
      className: "wep-card wep-card-horizontal"
    }, showImgToggler && item?.featured_image_url && featuredImgExist && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-img"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: item.featured_image_url[imageUrl],
      style: {
        ...(valueForWidth ? {
          maxWidth: widthPercentage,
          maxHeight: widthPercentage
        } : {
          maxWidth: widthController === true ? ImgWidth : "",
          maxHeight: widthController === true ? height : ""
        })
      },
      alt: item.title.rendered // Added alt text for accessibility
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-heading"
    }, showPostTitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
      className: "wep-card-title",
      style: {
        ...(title_Manage_styling && {
          fontSize: title_font_size
        })
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link,
      dangerouslySetInnerHTML: {
        __html: item?.title.rendered
      }
    })), showMeta && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "meta-data",
      style: {
        ...(Meta_Manage_styling && {
          fontSize: Meta_font_size
        })
      }
    }, formattedDate && `${formattedDate} `, item.post_author && `| Author: ${item.post_author} `, item.assigned_categories && `| Categories: ${item.assigned_categories} `)), showContent && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        ...(Content_Manage_styling && {
          fontSize: Content_font_size
        })
      },
      className: "wep-card-text",
      dangerouslySetInnerHTML: {
        __html: contentType === "Full-Post" ? item?.content?.rendered : !item?.excerpt?.rendered ? truncateContent(item?.content?.rendered, wordsLimit) : truncateContent(item?.excerpt?.rendered, wordsLimit)
      }
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "wep-card-footer"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: item.link,
      target: "_blank",
      className: "wep-btn wep-btn-primary",
      style: {
        ...(showReadMoreToggler && {
          "--wep-btn-bg": ReadMoreBgColor,
          "--wep-btn-hover-bg": `color-mix(in srgb, ${ReadMoreBgColor}, black 20%)`,
          "--wep-btn-color": ReadMoreTextColor,
          "--wep-btn-hover-color": ReadMoreTextColor,
          "--wep-btn-padding-y": button_Top_bottom_Padding,
          "--wep-btn-padding-x": button_Right_Left_Padding,
          "--wep-btn-font-size": Read_more_font_size
        })
      }
    }, __(ReadMoreText || 'Read More', "advanced-posts-listing"))));
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListingLayoutTwo);

/***/ }),

/***/ "./src/layouts/Masanory/MasanoryLayoutmodule.css":
/*!*******************************************************!*\
  !*** ./src/layouts/Masanory/MasanoryLayoutmodule.css ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/layouts/Overlay/OverlayLayout.css":
/*!***********************************************!*\
  !*** ./src/layouts/Overlay/OverlayLayout.css ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/layouts/Slider/Slidermodule.css":
/*!*********************************************!*\
  !*** ./src/layouts/Slider/Slidermodule.css ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/layouts/grid/Gridmodule.css":
/*!*****************************************!*\
  !*** ./src/layouts/grid/Gridmodule.css ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/layouts/listing/ListingLayout.css":
/*!***********************************************!*\
  !*** ./src/layouts/listing/ListingLayout.css ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/layouts/listingTwo/ListingLayoutTwo.css":
/*!*****************************************************!*\
  !*** ./src/layouts/listingTwo/ListingLayoutTwo.css ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"advanced-posts-listing/advanced-posts-listing-block","version":"1.0.5","title":"Advanced Posts Listing","category":"widgets","description":"Enables site admins to display blog post list and custom post type list.","example":{},"keywords":["post list","posts listing","posts","blog post","blog listing"],"attributes":{"selectedCustomPostType":{"type":"string","default":"Posts"},"showContent":{"type":"boolean","default":true},"contentType":{"type":"string","default":"Excerpt"},"showMeta":{"type":"boolean","default":true},"showPostTitle":{"type":"boolean","default":true},"showImgToggler":{"type":"boolean","default":true},"selectedImageTogggler":{"type":"boolean"},"widthPercentageState":{"type":"boolean"},"imageUrl":{"type":"string","default":"large"},"customPostsOptions":{"type":"array"},"showRange":{"type":"string"},"numPostsToShow":{"type":"number","default":10},"valueForWidth":{"type":"boolean","default":false},"widthPercentage":{"type":"string","default":"100%"},"widthController":{"type":"boolean","default":false},"height":{"type":"string"},"ImgWidth":{"type":"string"},"sortBy":{"type":"string","default":"new-to-old"},"wordsLimit":{"type":"number","default":30},"customTaxonomyPosts":{"type":"object","properties":{"[taxonomyType]":{"type":"array"}}},"showReadMoreToggler":{"type":"boolean"},"ReadMoreText":{"type":"string","default":"Read More"},"ReadMoreTextColor":{"type":"string","default":"#ffffff"},"ReadMoreBgColor":{"type":"string","default":"#000000"},"updatedCptIds":{"type":"array","items":{"type":"object","properties":{"ids":{"type":"integer"},"taxonomyType":{"type":"string"}}},"default":[]},"totalColoms":{"type":"number","default":3},"columnGap":{"type":"string","default":20},"rowGap":{"type":"string","default":30},"JustifyContent":{"type":"string","default":"start"},"prevName":{"type":"string","default":"Prev"},"nextName":{"type":"string","default":"Next"},"PaginationOnToggler":{"type":"boolean","default":true},"paginationAline":{"type":"string","default":"center"},"commaSeparatedIds":{"type":"array","default":[]},"RemoveCommaSeparatedIds":{"type":"array","default":[]},"selectedLayout":{"type":"string","default":"listing-layout"},"button_Top_bottom_Padding":{"type":"string","default":"10px"},"button_Right_Left_Padding":{"type":"string","default":"20px"},"title_Manage_styling":{"type":"boolean","default":false},"title_font_size":{"type":"string"},"Meta_Manage_styling":{"type":"boolean","default":false},"Meta_font_size":{"type":"string"},"Content_Manage_styling":{"type":"boolean","default":false},"Content_font_size":{"type":"string"},"Read_more_font_size":{"type":"string"},"customCSS":{"type":"string"}},"supports":{"color":{"background":true,"text":true,"gradients":true},"spacing":{"margin":true,"padding":true},"html":false,"typography":{"fontSize":true}},"textdomain":"advanced-posts-listing","editorScript":"file:./index.js","style":"file:./index.css"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/index.css */ "./src/styles/index.css");





const iconSVG = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
  class: "dashicons dashicons-excerpt-view"
});
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  icon: iconSVG,
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map