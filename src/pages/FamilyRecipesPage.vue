<template>
  <div class="container">
    <Header title="Family Recipes:"></Header>
    <RecipesViewGallery :get-data="getData" :in-db="true"></RecipesViewGallery>
  </div>
</template>

<script>
import Header from "@/components/Header";
import RecipesViewGallery from "@/components/RecipesViewGallery.vue";

export default {
  components: { RecipesViewGallery, Header },
  methods: {
    async getData(currentPage, limit) {
      try {
        let params = {
          skip: (currentPage - 1) * limit,
          limit: limit
        };
        const response = await this.axios.get("recipes/family", { params: params });
        return response.data;
      } catch (err) {
        this.$root.toast("Error", err.response.data.message, "danger");
      }
    }
  }
};
</script>

<style scoped>

</style>