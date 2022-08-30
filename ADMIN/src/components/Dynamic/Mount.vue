<template>
    <TransitionRoot as="template" :show="dynamic.state.openMount" style="z-index: 1000 !important">
        <Dialog as="div" class="fixed inset-0 overflow-hidden" @close="dynamic.state.openMount = false">
            <div class="absolute inset-0 overflow-hidden">
                <DialogOverlay class="absolute inset-0" />

                <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                    <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enter-from="translate-x-full" enter-to="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0"
                        leave-to="translate-x-full">
                        <div class="pointer-events-auto w-screen max-w-2xl">
                            <form class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                                autocomplete="off" @submit="onSubmit">
                                <div class="h-0 flex-1 overflow-y-auto">
                                    <div class="bg-cyan-700 py-6 px-4 sm:px-6">
                                        <div class="flex items-center justify-between">
                                            <DialogTitle class="text-lg font-medium text-white">
                                                Configuração de componentes
                                            </DialogTitle>
                                            <div class="ml-3 flex h-7 items-center">
                                                <button type="button"
                                                    class="rounded-md bg-cyan-700 text-cyan-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                    @click="dynamic.state.openMount = false">
                                                    <span class="sr-only">Close panel</span>
                                                    <XIcon class="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                        <div class="mt-1" v-show="!addNew">
                                            <div class="grid grid-cols-12 gap-2">
                                                <div class="col-span-12 sm:col-span-11">
                                                    <Select></Select>
                                                </div>
                                                <div>
                                                    <button type="button"
                                                        class="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md bg-stone-50 hover:bg-stone-100 focus:outline-none focus:ring-stone-200 m-1 w-full"
                                                        @click="addNewComponent">
                                                        <PlusSmIconSolid class=" h-4 w-4" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-1 flex-col justify-between">
                                        <div class="divide-y divide-gray-200 px-4 sm:px-6">
                                            <div v-if="SelectedComponentes" class="space-y-6 pt-6 pb-5">
                                                <div>
                                                    <label for="type" class="block text-sm font-medium text-gray-700">
                                                        Tipo
                                                    </label>
                                                    <div class="mt-1">
                                                        <select id="type" name="type"
                                                            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                            v-model="
                                                                dynamic.state.selectedComponent[route.query.page].input.type
                                                            ">
                                                            <option value="text">Texto Curto</option>
                                                            <option value="number">Número</option>
                                                            <option value="textarea">Texto Longo</option>
                                                            <option value="email">E-mail</option>
                                                            <option value="password">Senha</option>
                                                            <option value="date">Data</option>
                                                            <option value="time">Horas</option>
                                                            <option value="datetime-local">Data e Hora</option>
                                                            <!-- <option value="week">Semana</option> -->
                                                            <option value="radio">Lista de Escolha Única</option>
                                                            <option value="check">Lista de Múltipla Escolha</option>
                                                            <option value="select">Lista de Seleção</option>
                                                            <option value="file">Arquivo</option>
                                                            <option value="1to1">Link 1 para 1</option>
                                                            <option value="color">Cor</option>
                                                            <!-- <option value="range">Alcance</option> -->
                                                            <option value="url">Link</option>
                                                            <!-- <option value="tel">Telefone</option> PARA TELEFONE pattern="[0-9]{3}-[0-9]{2}-[0-9]{3} -->
                                                            <!-- <option value="image">Imagem</option> -->
                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="space-y-6 pt-6 pb-5"
                                                    v-if="SelectedComponentes.input.type == '1to1'">
                                                    <div>
                                                        <label for="pages"
                                                            class="block text-sm font-medium text-gray-700"> Página
                                                        </label>
                                                        <div class="mt-1">
                                                            <select id="pages" name="pages" autocomplete="pages-name"
                                                                required
                                                                v-model="dynamic.state.selectedComponent[route.query.page].SelectPagePKey"
                                                                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                                                                <option v-for="(Page, index) in PagesPKey" :key="index"
                                                                    v-show="Page.uid.replaceAll(' ', '').replace('+', '').trim() != route.query.page"
                                                                    :value="{ uid: Page.uid, name: Page.name }">
                                                                    {{ Page.name }}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div
                                                        v-if="dynamic.state.selectedComponent[route.query.page].SelectPagePKey !== undefined && dynamic.state.selectedComponent[route.query.page].SelectPagePKey != ''">
                                                        <label for="pages"
                                                            class="block text-sm font-medium text-gray-700"> Campo
                                                            referência
                                                        </label>
                                                        <div class="mt-1">
                                                            <select id="pages" name="pages" autocomplete="pages-name"
                                                                required
                                                                v-model="dynamic.state.selectedComponent[route.query.page].SelectFieldPKey"
                                                                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                                                                <option v-for="(Field, index) in FieldPagePKey"
                                                                    :key="index"
                                                                    :value="{ uid: Field.input.id, name: Field.label }">
                                                                    {{ Field.label }}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div v-else class="space-y-6 pt-6 pb-5">
                                                    <div>
                                                        <label for="project-name"
                                                            class="block text-sm font-medium text-gray-900">
                                                            Nome
                                                        </label>
                                                        <div class="mt-1">
                                                            <input type="text" id="project-name"
                                                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                v-model="
                                                                    dynamic.state.selectedComponent[
                                                                        route.query.page
                                                                    ].label
                                                                " />
                                                        </div>
                                                    </div>

                                                    <div v-if="SelectedComponentes.input.type == 'file'">
                                                        <div>
                                                            <label class="block text-sm font-medium text-gray-900">
                                                                Tipo de arquivos
                                                            </label>

                                                            <div class="flex items-start mt-2">
                                                                <div class="flex items-center h-5">
                                                                    <input id="type" name="type"
                                                                        v-model="dynamic.state.selectedComponent[route.query.page].input.type_file"
                                                                        v-bind:value="'image/*'" type="radio" checked
                                                                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                                                </div>
                                                                <div class="ml-3 text-sm">
                                                                    <label for="money"
                                                                        class="font-medium text-gray-700">
                                                                        Imagem
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div class="flex items-start mt-2">
                                                                <div class="flex items-center h-5">
                                                                    <input id="type" name="type"
                                                                        v-model="dynamic.state.selectedComponent[route.query.page].input.type_file"
                                                                        type="radio"
                                                                        v-bind:value="'.xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf'"
                                                                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                                                                </div>
                                                                <div class="ml-3 text-sm">
                                                                    <label for="money"
                                                                        class="font-medium text-gray-700">
                                                                        Documentos
                                                                    </label>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div v-if="SelectedComponentes.input.type == 'number'">
                                                        <div>
                                                            <label for="project-name"
                                                                class="block text-sm font-medium text-gray-900">
                                                                Numero de casas decimais
                                                            </label>
                                                            <div class="mt-1">
                                                                <input type="number" id="project-name"
                                                                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                    v-model="dynamic.state.selectedComponent[route.query.page].input.step" />
                                                            </div>
                                                        </div>
                                                        <div class="flex items-start mt-2">
                                                            <div class="flex items-center h-5">
                                                                <input id="money"
                                                                    v-model="dynamic.state.selectedComponent[route.query.page].input.money"
                                                                    type="checkbox"
                                                                    class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                                            </div>
                                                            <div class="ml-3 text-sm">
                                                                <label for="money" class="font-medium text-gray-700">
                                                                    Moeda
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div v-if="
                                                        SelectedComponentes.input.type == 'radio' ||
                                                        SelectedComponentes.input.type == 'check' ||
                                                        SelectedComponentes.input.type == 'select'
                                                    ">
                                                        <label
                                                            class="block text-sm font-medium text-gray-900 mb-1">Opções</label>
                                                        <div v-for="(option, index) in dynamic.state
                                                        .selectedComponent[route.query.page].input
                                                        .options" :key="index" class="flex -space-x-px">
                                                            <div class="w-1/2 flex-1 min-w-0 mb-1">
                                                                <input type="text" name="label" id="label"
                                                                    class="focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none bg-transparent focus:z-10 sm:text-sm border-gray-300"
                                                                    placeholder="Nome" v-model="option.label" />
                                                            </div>
                                                            <div class="flex-1 min-w-0">
                                                                <input type="text" name="value" id="value"
                                                                    class="focus:ring-indigo-500 focus:border-indigo-500 relative block w-full rounded-none bg-transparent focus:z-10 sm:text-sm border-gray-300"
                                                                    placeholder="Valor" v-model="option.value" />
                                                            </div>
                                                            <div class="pl-2">
                                                                <button type="button" @click="delOption(index, dynamic.state
                                                                .selectedComponent[route.query.page].input
                                                                .options)"
                                                                    class=" inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                                    <TrashIcon class=" h-5 w-5" aria-hidden="true" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <button type="button"
                                                            class="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-1 w-full"
                                                            @click="addOption">
                                                            Adicionar mais opções
                                                            <PlusSmIconSolid class="ml-2 -mr-0.5 h-4 w-4"
                                                                aria-hidden="true" />
                                                        </button>
                                                    </div>

                                                    <div v-if="
                                                        SelectedComponentes.input.type != 'radio' &&
                                                        SelectedComponentes.input.type != 'check' &&
                                                        SelectedComponentes.input.type != 'select'
                                                    ">
                                                        <label for="placeholder"
                                                            class="block text-sm font-medium text-gray-900">
                                                            Informação
                                                        </label>
                                                        <div class="mt-1">
                                                            <input type="text" id="placeholder"
                                                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                v-model="
                                                                    dynamic.state.selectedComponent[
                                                                        route.query.page
                                                                    ].input.placeholder
                                                                " />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label class="block text-sm font-medium text-gray-900">
                                                        Tamanho
                                                    </label>
                                                    <div class="flex items-center">
                                                        <input id="pequeno" name="size" type="radio"
                                                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                            v-model="
                                                                dynamic.state.selectedComponent[
                                                                    route.query.page
                                                                ].input.size
                                                            " value="3" />
                                                        <label for="pequeno"
                                                            class="ml-3 block text-sm font-medium text-gray-700">
                                                            Pequeno
                                                        </label>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input id="medio" name="size" type="radio"
                                                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                            v-model="
                                                                dynamic.state.selectedComponent[
                                                                    route.query.page
                                                                ].input.size
                                                            " value="4" />
                                                        <label for="medio"
                                                            class="ml-3 block text-sm font-medium text-gray-700">
                                                            Médio
                                                        </label>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input id="grande" name="size" type="radio"
                                                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                            v-model="
                                                                dynamic.state.selectedComponent[
                                                                    route.query.page
                                                                ].input.size
                                                            " value="6" />
                                                        <label for="grande"
                                                            class="ml-3 block text-sm font-medium text-gray-700">
                                                            Grande
                                                        </label>
                                                    </div>
                                                    <div class="flex items-center">
                                                        <input id="Extra Grande" name="size" type="radio"
                                                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                            v-model="
                                                                dynamic.state.selectedComponent[
                                                                    route.query.page
                                                                ].input.size
                                                            " value="12" />
                                                        <label for="Extra Grande"
                                                            class="ml-3 block text-sm font-medium text-gray-700">
                                                            Extra Grande
                                                        </label>
                                                    </div>
                                                </div>

                                                <SwitchGroup as="div" class="flex items-center">
                                                    <Switch v-model="SelectedComponentes.input.required" :class="[
                                                        SelectedComponentes.input.required
                                                            ? 'bg-indigo-600'
                                                            : 'bg-gray-200',
                                                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                                                    ]">
                                                        <span aria-hidden="true" :class="[
                                                            dynamic.state.selectedComponent[
                                                                route.query.page
                                                            ].input.required
                                                                ? 'translate-x-5'
                                                                : 'translate-x-0',
                                                            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                                                        ]" />
                                                    </Switch>
                                                    <SwitchLabel as="span" class="ml-3">
                                                        <span class="text-sm font-medium text-gray-900">Campo
                                                            Obrigatório
                                                        </span>
                                                    </SwitchLabel>
                                                </SwitchGroup>

                                                <SwitchGroup as="div" class="flex items-center">
                                                    <Switch v-model="SelectedComponentes.table.visible" :class="[
                                                        SelectedComponentes.table.visible
                                                            ? 'bg-indigo-600'
                                                            : 'bg-gray-200',
                                                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                                                    ]">
                                                        <span aria-hidden="true" :class="[
                                                            dynamic.state.selectedComponent[
                                                                route.query.page
                                                            ].table.visible
                                                                ? 'translate-x-5'
                                                                : 'translate-x-0',
                                                            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                                                        ]" />
                                                    </Switch>
                                                    <SwitchLabel as="span" class="ml-3">
                                                        <span class="text-sm font-medium text-gray-900">Exibir campo
                                                            na
                                                            listagem
                                                        </span>
                                                    </SwitchLabel>
                                                </SwitchGroup>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- buttons -->
                                <div class="flex flex-shrink-0 justify-end px-4 py-4">
                                    <button v-if="SelectedComponentes" type="button"
                                        class=" ml-4 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        @click="close">
                                        Limpar
                                    </button>
                                    <button v-if="SelectedComponentes && !addNew" type="button"
                                        class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        @click="delComponent(SelectedComponentes)">
                                        Apagar
                                    </button>
                                    <button v-if="SelectedComponentes" type="submit"
                                        class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        Salvar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref, computed } from "vue";
import Select from "../input/Select.vue";
import dynamic from "../../store/dynamic";
import menu from "../../store/menu";
import db from "../../store/db";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
import sotreSwal from "../../store/swal";

import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot, Switch, SwitchGroup, SwitchLabel, } from "@headlessui/vue";
import { LinkIcon, PlusSmIcon, QuestionMarkCircleIcon, PlusSmIcon as PlusSmIconSolid } from "@heroicons/vue/solid";
import { XIcon, TrashIcon } from "@heroicons/vue/outline";

const route = useRoute();
const SelectedComponentes = computed(() => dynamic.state.selectedComponent[route.query.page]);


// const SelectPagePKey = ref('')
const PagesPKey = computed(() => {
    let pages = []
    for (let index = 0; index < menu.state.navigation.length; index++) {
        const element = menu.state.navigation[index];
        if (element.name === 'Dashboard' || element.name === 'Configurações') continue

        if (element.children.length > 0) {
            for (let index = 0; index < element.children.length; index++) {
                const element2 = element.children[index];
                pages.push({
                    uid: element2.uid.replaceAll(' ', '').trim(),
                    name: element2.name
                })
            }
        } else {
            pages.push({
                uid: element.uid.replaceAll(' ', '').trim(),
                name: element.name
            })
        }
    }
    return pages
});
const FieldPagePKey = computed(() => {
    const SelectPagePKey = dynamic.state.selectedComponent[route.query.page].SelectPagePKey.uid
    if (SelectPagePKey === undefined) return []
    let callback = dynamic.state.drawPage.find(element => element.page == SelectPagePKey.replaceAll(' ', '').replaceAll("+", "").trim())
    return callback.comp
});


function addOption() {
    if (!dynamic.state.selectedComponent[route.query.page].input.hasOwnProperty("options")) {
        dynamic.state.selectedComponent[route.query.page].input.options = [];
    }

    dynamic.state.selectedComponent[route.query.page].input.options.push({
        label: "",
        value: "",
    });
}
let addNew = ref(false);
async function addNewComponent() {
    if (SelectedComponentes.value !== undefined) {
        await Swal.fire({
            title: "Você está com um componente carregado",
            text: "Deseja realmente criar um componente novo? As informações não salvas serão perdidas",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) { addNew.value = true; }
            dynamic.state.openMount = true;
        });
    } else {
        addNew.value = true;
    }

    if (addNew.value == false) return;
    newselectedComponent();
}

function close() {
    dynamic.state.openMount = false;
    dynamic.state.selectedComponent[route.query.page] = undefined;

    addNew.value = false;
}

function validadeField(id) {
    let valid = true
    for (let index = 0; index < dynamic.state.components.length; index++) {
        const element = dynamic.state.components[index];
        if (element.input.id == id) valid = false
    }
    return valid
}


async function onSubmit(ev) {
    ev.preventDefault();
    let newField = false;
    let callback = dynamic.state.drawPage.find((element) => element.page == route.query.page).comp;
    let CompEdit = callback.find((element) => element.input.id == dynamic.state.selectedComponent[route.query.page].input.id);

    if (CompEdit === undefined) {
        const id = dynamic.state.selectedComponent[route.query.page].label.trim().toLowerCase().replaceAll(" ", "_")

        if (!validadeField(id)) {
            sotreSwal.commit(
                'alert',
                { icon: 'error', title: 'Atenção', text: 'Não é possível adicionar dois campos com o mesmo nome.', confirmButtonText: 'OK' }
            )
            return
        }

        CompEdit = await dynamic.dispatch('GetBlankComponent')

        CompEdit.input.id = id
        if (dynamic.state.selectedComponent[route.query.page].hasOwnProperty("SelectFieldPKey"))
            CompEdit.input.id = dynamic.state.selectedComponent[route.query.page].SelectPagePKey.name

        newField = true;
    }

    CompEdit.label = dynamic.state.selectedComponent[route.query.page].label;
    CompEdit.input.name = dynamic.state.selectedComponent[route.query.page].label;
    CompEdit.input.autocomplete = dynamic.state.selectedComponent[route.query.page].label;
    CompEdit.input.placeholder = dynamic.state.selectedComponent[route.query.page].input.placeholder;
    CompEdit.input.required = dynamic.state.selectedComponent[route.query.page].input.required;
    CompEdit.input.type = dynamic.state.selectedComponent[route.query.page].input.type;
    CompEdit.input.size = dynamic.state.selectedComponent[route.query.page].input.size;
    CompEdit.input.step = dynamic.state.selectedComponent[route.query.page].input.step;
    CompEdit.input.money = dynamic.state.selectedComponent[route.query.page].input.money;
    CompEdit.input.type_file = dynamic.state.selectedComponent[route.query.page].input.type_file;
    CompEdit.table.visible = dynamic.state.selectedComponent[route.query.page].table.visible;

    if (dynamic.state.selectedComponent[route.query.page].input.hasOwnProperty("options")) {
        CompEdit.input.options = [];
        for (let index = 0; index < dynamic.state.selectedComponent[route.query.page].input.options.length; index++) {
            const element = dynamic.state.selectedComponent[route.query.page].input.options[index];
            CompEdit.input.options.push(element);
        }
    }
    if (dynamic.state.selectedComponent[route.query.page].hasOwnProperty("SelectFieldPKey")) {
        // CompEdit.input.required = true
        CompEdit.label = dynamic.state.selectedComponent[route.query.page].SelectPagePKey.name
        CompEdit.input.name = dynamic.state.selectedComponent[route.query.page].SelectPagePKey.name
        CompEdit.SelectPagePKey = dynamic.state.selectedComponent[route.query.page].SelectPagePKey
        CompEdit.SelectFieldPKey = dynamic.state.selectedComponent[route.query.page].SelectFieldPKey
        // console.log(dynamic.state.selectedComponent[route.query.page]);
    }
    // return
    if (newField) {
        callback.push(CompEdit);
    }
    dynamic.dispatch('Save')
    dynamic.commit("loading", route);

    dynamic.state.selectedComponent[route.query.page] = undefined;
    addNew.value = false;

    sotreSwal.commit('notification', { icon: 'success', title: 'Operação realizada com sucesso.' })
}

async function newselectedComponent() {
    dynamic.state.selectedComponent[route.query.page] = await dynamic.dispatch('GetBlankComponent')
}

function delOption(index, options) {
    options.splice(index, 1)
}
async function delComponent(component) {
    if (component === undefined) return
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

            let DeletIndex = null
            let callback = dynamic.state.drawPage.find(element => element.page == route.query.page).comp

            for (let index = 0; index < callback.length; index++) {
                const element = callback[index];
                if (element.input.id == component.input.id) DeletIndex = index
            }

            if (DeletIndex != null) callback.splice(DeletIndex, 1)
            dynamic.dispatch('Save')
            dynamic.commit("loading", route);
            addNew.value = false;
            dynamic.state.selectedComponent[route.query.page] = undefined;
            sotreSwal.commit('notification', { icon: 'success', title: 'Item excluido com sucesso.' })
        }
    });


}
</script>
