import getContract from "./utils/getContract.js";
const { ethers: etherjs } = ethers;

async function getTodoList() {
  const contract = getContract();
  try {
    const response = await contract.getTodos();
    console.log(response, "response")
    const formatted = response.map((item) => {
      return {
        name: item[0],
        description: item[1],
        status: item[2],
      };
    });
    return formatted;
  } catch (error) {
    console.log("error", error);
  }
}


const upadateTodoUI = async () => {
  const data = await getTodoList();
  console.log(data, "data");
  let title = ""
  data.forEach((item) => {
    title += `<li> ${item.name} <b>-</b> ${item.description} </li>`
  });

  document.getElementById("list-disc").innerHTML = title
};

upadateTodoUI();

// add new list

async function connectWallet(){
  const signerProvider = new etherjs.providers.Web3Provider(window.ethereum);
  await signerProvider.send("eth_requestAccounts", []);
}

async function AddTodo(e){
  e.preventDefault();

  await connectWallet()
  const contract = getContract(true);
  const mytitle = document.getElementById("title").value;
  const mydescription = document.getElementById("description").value;
  try {
    await contract.createTodo(mytitle, mydescription);
  } catch (error) {
    console.log("error", error);
  }
}

const addButton = document.getElementById("addBtn")
addButton.addEventListener("click", AddTodo)
