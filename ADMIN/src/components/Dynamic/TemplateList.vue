<template>
    <div>
        <b v-if="mobile()"> {{ component.input.id[0].toUpperCase() + component.input.id.substr(1).replaceAll("_", " ")}}: </b>
            <span v-if="component.input.type == 'check'">
                <div v-for="option in inf[component.input.id]" :key="option.name">
                    <span v-if="option.value"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 m-1">
                        {{ option.name }}
                    </span>
                </div>
            </span>

            <!-- 1TO1 -->
            <span v-else-if="component.input.type == '1to1'">
                {{ Get1to1(inf[component.input.id]) }}
            </span>

            <span v-else-if="component.input.type == 'color'" class="text-center" >
                <div :style="'background-color:' + inf[component.input.id] + ';'" class="w-8 h-8 m-auto rounded-full"></div>
            </span>

            <!-- url -->
            <span v-else-if="component.input.type == 'url'">
                <a :href="inf[component.input.id]" target="_blank">Acessar link</a>
            </span>

            <!-- DATA -->
            <span v-else-if="component.input.type == 'date'">
                {{ convertDate(inf[component.input.id]) }}
            </span>

            <!-- DATA HORA -->
            <span v-else-if="component.input.type == 'datetime-local'">
                <p v-html="convertDatetime(inf[component.input.id])"></p>
            </span>

            <!-- NUMERO -->
            <span v-else-if="component.input.type == 'number'">
                <span v-show="component.input.money">
                    {{
                            parseFloat(inf[component.input.id])
                                .toLocaleString(
                                    'pt-BR',
                                    {
                                        minimumFractionDigits: component.input.step,
                                        style: 'currency', currency: 'BRL'
                                    }
                                )
                    }}
                </span>
                <span v-show="!component.input.money">
                    {{
                            parseFloat(inf[component.input.id]).toFixed(component.input.step)
                    }}
                </span>

            </span>

            <!-- ARQUIVO -->
            <span v-else-if="component.input.type == 'file'">
                <!-- v-show="component.input.type_file  == 'image/*'" -->
                <span v-show="component.input.type_file != '.xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf'">
                    
                    <div v-if="inf[component.input.id] !== undefined" class="m-1">
                        <a :href="inf[component.input.id].myURL" target="_blank"
                            :download="inf[component.input.id].name">
                            <img :class="'inline-block h-' + sizeImg + ' w-' + sizeImg + ' rounded'" alt="" :src="
                                inf[component.input.id] !== undefined && getImage(inf[component.input.id]) ?
                                    inf[component.input.id].myURL :
                                    'https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cindra/imagens/sem.jpg.gif/image'
                            " />
                        </a>
                    </div>
                </span>
                <span
                    v-show="component.input.type_file == '.xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf'">
                    <div v-if="inf[component.input.id] !== undefined">
                        <!-- <p
                            class="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            {{ inf[component.input.id].name }}</p> -->
                        <p class="mb-2">Download</p>
                        <a :href="inf[component.input.id].myURL" target="_blank"
                            :download="inf[component.input.id].name"
                            class="inline-flex items-center px-2 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">

                            <DownloadIcon class="h-4 w-4" aria-hidden="true" />
                        </a>
                    </div>
                    <div v-else class="text-red-500 text-lg">
                        <b>-</b>
                    </div>
                </span>
            </span>

            <!-- TEXTAREA -->
            <span
                v-else-if="component.input.type == 'textarea' && inf[component.input.id] !== undefined">

                <textarea disabled v-model="inf[component.input.id]" rows="3"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" />

            </span>

            <!-- OUTROS -->
            <span v-else>
                {{ inf[component.input.id] }}
            </span>
    </div>
</template>

<script setup >
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon, EyeIcon, XIcon } from '@heroicons/vue/solid'
import { getStorage, ref as refStorage, getDownloadURL } from "firebase/storage";
import mobile from 'is-mobile';
    
const props = defineProps({
    inf: Object,
    component: Object,
    sizeImg: String

})

function getImage(params) {
    if (params === undefined) return false
    // if (params.hasOwnProperty('fullPath')) return ''
    const storage = getStorage();
    return getDownloadURL(refStorage(storage, params.fullPath))
        .then((url) => {
            params.myURL = url
            return true
        })
        .catch(() => {
            return false
        });
}

function convertDate(params) {
    if (params === undefined) return ''
    var date = new Date(params);
    date.setHours(date.getHours() + 3); // PRECISO ADD 3 HORAS POR COMO O TIMEZONE ESTÁ greenwich QUANDO CONVERTO ELE TIRA ESSAS 3h E ZOA A DATA
    return date.toLocaleDateString("pt-BR");
}

function convertDatetime(params) {
    if (params === undefined) return ''
    var date = new Date(params);
    // date.setHours(date.getHours() + 3); // PRECISO ADD 3 HORAS POR COMO O TIMEZONE ESTÁ greenwich QUANDO CONVERTO ELE TIRA ESSAS 3h E ZOA A DATA
    return date.toLocaleDateString("pt-BR") + ' <br>' + date.toLocaleTimeString("pt-BR");;
}

function Get1to1(Component) {
    return Component != undefined && Component.hasOwnProperty("name") ? Component.name : ''
}
</script>

<style>

</style>