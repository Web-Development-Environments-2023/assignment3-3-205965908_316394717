<template>
  <form>
    <b>Instruction {{ instructionCounter }} :</b>
    <div class="form-outline mb-4">
      <label class="form-label" for="form6Example3" style="margin-left: 0px;">Step</label>
      <input type="text" id="form6Example3" class="form-control"
             v-model="$root.store.recipeInformation[dictKey].step">
      <div class="form-notch">
        <div class="form-notch-leading" style="width: 9px;"></div>
        <div class="form-notch-middle" style="width: 29px;"></div>
        <div class="form-notch-trailing"></div>
      </div>
    </div>
    <component v-for="(IngredientInputModal, i) in ingredientComponent"
               v-bind:ingredientCounter="i+1" :instructionId="instructionCounter"
               :key="'I'+ i" :is="IngredientInputModal" />
    <component v-for="(EquipmentInputModal, i) in equipmentComponent"
               v-bind:equipmentCounter="i+1" :instructionId="instructionCounter"
               :key="'E'+ i" :is="EquipmentInputModal" />
    <button @click="addIngredient" class="btn btn-warning btn-block">Add Ingredient</button>
    <button @click="addEquipment" class="btn btn-success btn-block">Add Equipment</button>
    <br>
    <br>
  </form>
</template>

<script>
import IngredientInputModal from "./IngredientInputModal";
import EquipmentInputModal from "./EquipmentInputModal";

export default {
  name: "InstructionInputModal",
  props: ["instructionCounter"],
  created() {
    this.$root.store.recipeInformation[this.dictKey] =
      {
        number: this.instructionCounter,
        step: "",
        ingredients: [],
        equipments: []
      };
  },
  data() {
    return {
      dictKey: `Instruction-${this.instructionCounter}`,
      ingredientComponent: [],
      equipmentComponent: []
    };
  },
  methods: {
    addIngredient() {
      this.ingredientComponent.push(IngredientInputModal);
    },
    addEquipment() {
      this.equipmentComponent.push(EquipmentInputModal);
    }
  }
};
</script>

<style scoped>
</style>