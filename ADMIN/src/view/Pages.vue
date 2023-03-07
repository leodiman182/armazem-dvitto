<template>
    <div>
        <div class="pb-2 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Configuração de Páginas</h3>
            <div class="mt-3 sm:mt-0 sm:ml-4">
                <button @click="save" type="button"
                    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Salvar</button>
            </div>
        </div>
        <div class="m-4 text-blue-700">
            <a href="https://heroicons.com/" target="_blank">Acessar site com todos os
                icones</a>
        </div>
        <ul class="mt-2">
            <li v-for="(item, index) in list" :key="index" class="list-outside grid grid-cols-12 gap-4">
                <div v-if="item.children" class="col-span-1"></div>
                <div class="mt-1 flex rounded-md col-span-8">
                    <component v-if="!item.children" :is="HIcons[convertIcon(item.icon) + 'Icon']"
                        class=" m-1 p-1 h-8 w-8 border-b" aria-hidden="true" />
                    <div v-if="!item.children" class="relative flex items-stretch flex-grow focus-within:z-10">
                        <input type="text" v-model="item.icon"
                            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md  sm:text-sm border-gray-300"
                            placeholder="Icones do https://heroicons.com/" />
                    </div>
                    <div class="relative flex items-stretch flex-grow focus-within:z-10">
                        <input type="text" v-model="item.label"
                            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none   sm:text-sm border-gray-300"
                            placeholder="Informe o nome da nova página" />
                    </div>
                    <div class="relative flex items-stretch flex-grow focus-within:z-10">
                        <select 
                            v-model="item.permission"
                            id="permission" 
                            name="permission" 
                            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        >
                            <option value="[1,2,3]" selected="">Todas as ações</option>
                            <option value="[1]">Cadastrar</option>
                            <option value="[1,2]">Cadastrar | Editar</option>
                            <option value="[1,3]">Cadastrar | Excluir</option>
                            <option value="[2]">Editar</option>
                            <option value="[2,3]">Editar | Excluir</option>
                            <option value="[3]">Excluir</option>
                        </select>
                    </div>
                </div>
                <div class="mt-1 flex rounded-md  col-span-3">
                    <button v-if="index > 0" @click="del(index)" type="button"
                        class="ml-1 mr-1 relative inline-flex items-center  ">
                        <TrashIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
                    </button>
                    <button @click="item.children = false" v-if="item.children" type="button"
                        class="ml-1 mr-1 relative inline-flex items-center  ">
                        <ChevronDoubleLeftIcon class="h-5 w-5 text-blue-400" aria-hidden="true" />
                    </button>
                    <button @click="item.children = true" v-if="!item.children && index > 0" type="button"
                        class="ml-1 mr-1 relative inline-flex items-center  ">
                        <ChevronDoubleRightIcon class="h-5 w-5 text-blue-400" aria-hidden="true" />
                    </button>

                    <button @click="downs(index)" v-if="index != list.length - 1" type="button"
                        class="ml-1 mr-1 relative inline-flex items-center  ">

                        <ArrowDownIcon class="h-5 w-5 text-blue-400" aria-hidden="true" />
                    </button>
                    <button @click="up(index)" v-if="index > 0" type="button"
                        class="ml-1 mr-1 relative inline-flex items-center  ">
                        <ArrowUpIcon class="h-5 w-5 text-blue-400" aria-hidden="true" />
                    </button>
                    <button @click="add(index)" type="button" class="ml-1 mr-1 relative inline-flex items-center  ">
                        <PlusIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
                    </button>
                
                </div>
            </li>
            <!---->

        </ul>
    </div>
</template>


<script setup>
import { TrashIcon, MinusIcon, PencilAltIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon, PlusIcon, ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/solid'
import storeMenu from '../store/menu'
import storeSwal from '../store/swal'
import Swal from "sweetalert2";
import { ref } from 'vue'
import db from '../store/db'
import { getDocs, onSnapshot, addDoc, collection, setDoc, doc, } from "firebase/firestore";
import { async } from '@firebase/util';
import * as HIcons from '@heroicons/vue/outline'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

let list = ref([
    {
        label: '',
        icon: '',
        children: false,
        orderby: 1
    },
])

onSnapshot(doc(db.state.Firestore, "menu", 'list'), (doc) => {
    if (doc.data() === undefined) return
    list.value = doc.data().data
});


function convertIcon(icon) {
    if (icon == '' || icon === undefined) return ''
    icon = icon.split('-')
    let newIcon = ''
    for (let index = 0; index < icon.length; index++) {
        const element = icon[index];
        newIcon += element[0].toUpperCase() + element.substr(1)

    }
    newIcon = newIcon[0].toUpperCase() + newIcon.substr(1)
    return newIcon
}

async function save() {
    let menu = []
    let RefPages = []
    let newMenu = null
    for (let index = 0; index < list.value.length; index++) {
        const element = list.value[index];
        if (!element.hasOwnProperty('uid')) element.uid = (btoa(element.label + new Date())).replaceAll(' ', '').replace("+", "").trim()

        if (element.children && index == 0) element.children = false

        if (!element.children && index > 0) {
            menu.push(newMenu)
            newMenu = null
        }

        if (!element.children) {
            const newIcon = convertIcon(element.icon)
            // console.log(newIcon);
            newMenu = {
                name: element.label,
                permission: element.permission,
                uid: element.uid.replaceAll(' ', '').replace("+", "").trim(),
                icon: newIcon + 'Icon',
                to: '/dynamic/list?page=' + element.uid.replaceAll(' ', '').replace("+", "").trim() + '&name=' + element.label.trim(),
                children: []
            }

            RefPages.push(
                {
                    uid:element.uid.replaceAll(' ', '').replace("+", "").trim(),
                    page:element.label.trim()
                }
            )
        } else {
            newMenu.children.push({
                name: element.label,
                permission: element.permission,
                uid: element.uid.replaceAll(' ', '').replace("+", "").trim(),
                to: '/dynamic/list?page=' + element.uid.replaceAll(' ', '').replace("+", "").trim() + '&name=' + element.label.trim()
            })

            RefPages.push(
                {
                    uid:element.uid.replaceAll(' ', '').replace("+", "").trim(),
                    page:element.label.trim()
                }
            )
        }
    }
    if (newMenu != null) {
        menu.push(newMenu)
        newMenu = null
    }
    storeMenu.dispatch('Save', menu)
    storeMenu.dispatch('SaveRefs', RefPages)
    storeMenu.dispatch('SaveList', list.value)
    storeSwal.commit('notification', { icon: 'success', title: 'Operação realizada com sucesso.' })

}

function up(indexUp) {
    list.value[indexUp].orderby -= 1
    list.value[indexUp - 1].orderby += 1

    list.value.sort((a, b) => a.orderby - b.orderby)
}
function downs(indexDown) {
    list.value[indexDown].orderby += 1
    list.value[indexDown + 1].orderby -= 1

    list.value.sort((a, b) => a.orderby - b.orderby)
}

function add(indexAdd) {

    for (let index = 0; index < list.value.length; index++) {
        const element = list.value[index];
        if (element.orderby > indexAdd) {
            element.orderby = index + 1
        }
    }
    list.value.push({
        label: '',
        children: false,
        orderby: indexAdd + 1
    })
    list.value.sort((a, b) => a.orderby - b.orderby)

}
async function del(index) {
    await Swal.fire({
        title: "Você deseja realmente excluir esse item?",
        text: "Essa operação não poderá ser revertida.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
    }).then((result) => {
        if (result.isConfirmed) {
            list.value.splice(index, 1)
            dynamic.dispatch('SaveDB', { page: route.query.page, data: dynamic.state.table[route.query.page] })
            sotreSwal.commit('notification', { icon: 'success', title: 'Item excluido com sucesso.' })
        }
    });

}

</script>