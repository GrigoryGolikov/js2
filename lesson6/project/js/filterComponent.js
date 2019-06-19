Vue.component('filter-products', {
    data() {
        return {
            textFilter: "",
        }
    },


    template:
    `<form action="#" method="post" class="search-form"  @submit.prevent="$root.$refs.products.filter(textFilter) ">
        <input type="search"  class="search-field" v-model="textFilter" placeholder="search... ">
        <button class="btn-search" type="submit">
            <i class="fas fa-search"></i>
        </button>
    </form>`
})

