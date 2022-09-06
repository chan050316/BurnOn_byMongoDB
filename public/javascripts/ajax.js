const submitAdd = document.querySelector("#add");
const submitDelete = document.querySelector("#delete");

const addFormData = document.querySelector("#addForm");
const deleteFormData = document.querySelector(".deleteForm");

const quote = addFormData[0].value;
const author = addFormData[1].value;

console.dir(addFormData[0]);

const sendPutMethod = () => {
  const quote = addFormData[0].value;
  const author = addFormData[1].value;
  const formData = {
    quote: quote,
    author: author,
  };
  console.log(formData);
  $.ajax({
    cache: false,
    type: "put",
    dataType: "String",
    url: "/settingQuote/add",
    data: JSON.stringify(formData),
  });
};

const sendDeleteMethod = () => {};

submitAdd.addEventListener("click", sendPutMethod);
submitDelete.addEventListener("click", sendDeleteMethod);
