// tabs.js

window.onload = function () {
  let data = build_spec;

  try {
    initSchema(data["x-enum"]);
  } catch (error) {
    console.trace(error);
  }

  try {
    initTag(data["x-tags"]);
  } catch (error) {
    console.trace(error);
  }

  try {
    loadExample(data["x-examples"]);
  } catch (error) {
    console.trace(error);
  }

  try {
    console.log(features);
    loadFeatures("draft-print_media");
  } catch (error) {
    console.trace(error);
  }

  try {
    loadFlows(data["x-flows"]);
  } catch (error) {
    console.trace(error);
  }

  try {
    loadAttributes(data["x-attributes"]);
  } catch (error) {
    console.trace(error);
  }
  try {
    loadErrors(data["x-errorcodes"]);
  } catch (error) {
    console.trace(error);
  }
};

// tabs.js

// function onFirstLoad(build_spec, features) {
//   let data = build_spec;

//   console.log("full data", data);

//   try {
//     initSchema(data["x-enum"]);
//   } catch (error) {
//     console.trace(error);
//   }

//   try {
//     initTag(data["x-tags"]);
//   } catch (error) {
//     console.trace(error);
//   }

//   try {
//     loadExample(data["x-examples"]);
//   } catch (error) {
//     console.trace(error);
//   }

//   try {
//     loadFeatures(features);
//   } catch (error) {
//     console.trace(error);
//   }

//   try {
//     loadFlows(data["x-flows"]);
//   } catch (error) {
//     console.trace(error);
//   }

//   try {
//     loadAttributes(data["x-attributes"]);
//   } catch (error) {
//     console.trace(error);
//   }
//   try {
//     loadErrors(data["x-errorcodes"]);
//   } catch (error) {
//     console.trace(error);
//   }
// }

// window.onload = function(){
//       onFirstLoad(build_spec)
// }
