let itemsList = []

const form = document.getElementById("form-itens")

form.addEventListener("submit", (e) => {
	e.preventDefault()
	const itemInput = document.getElementById("receber-item")
	submitItem(itemInput)
	buildList()

	itemInput.focus()
	itemInput.value = ""
})

function submitItem(item) {
	const duplicatedItem = itemsList.some((i) => i.valor.toUpperCase() === item.value.toUpperCase())

	if (duplicatedItem) {
		alert("Esse item já existe na lista")
	} else {
		itemsList.push({
			valor: item.value,
			check: false,
		})
	}
}

function updateLocalStorage() {
	localStorage.setItem("itemsList", JSON.stringify(itemsList))
}

const itemsFromStorage = localStorage.getItem("itemsList")

if (itemsFromStorage) {
	itemsList = JSON.parse(itemsFromStorage)
	buildList()
} else {
	itemsList = []
}

function buildList() {
	const list = document.getElementById("lista-de-itens")
	const listCheckeds = document.getElementById("itens-comprados")

	list.innerHTML = ""
	listCheckeds.innerHTML = ""

	console.log(itemsList)

	itemsList.map((item, index) => {
		if (item.check) {
			listCheckeds.innerHTML += `<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked class="is-clickable" />  
                    <span class="itens-comprados is-size-5">${item.valor}</span>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>`
		} else {
			list.innerHTML += `<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
                <input type="checkbox" class="is-clickable" />
                <input type="text" class="is-size-5" value="${item.valor}" disabled='disabled'></input>
            </div>
            <div>
                <i class="fa-regular fa-floppy-disk is-clickable salvar" style='display:none;'></i><i class="fa-regular is-clickable fa-pen-to-square editar"></i>
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
        </li>`
		}
	})

	const checkboxs = document.querySelectorAll('input[type="checkbox"]')

	checkboxs.forEach((checkbox) =>
		checkbox.addEventListener("click", (e) => {
			const index = e.target.parentElement.parentElement.getAttribute("data-value")
			itemsList[index].check = e.target.checked
			buildList()
		})
	)

	const deleteButtons = document.querySelectorAll(".deletar")

	deleteButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			const index = e.target.parentElement.parentElement.getAttribute("data-value")
			itemsList.splice(index, 1)
			buildList()
		})
	})

	const editButtons = document.querySelectorAll(".editar")

	editButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			const input = e.target.parentElement.previousElementSibling.children[1]
			input.removeAttribute("disabled")
			e.target.style.display = "none"
			e.target.previousElementSibling.style.display = "inline-block"
		})
	})
	const saveButtons = document.querySelectorAll(".salvar")

	saveButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			const index = e.target.parentElement.parentElement.getAttribute("data-value")
			saveItem(index)
		})
	})

	updateLocalStorage()
}

function saveItem(index) {
	const item = document.querySelector(`[data-value="${index}"] input[type="text"]`)
	console.log(item.value)
	itemsList[index].valor = item.value
	buildList()
}
