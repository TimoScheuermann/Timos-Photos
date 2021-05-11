<template>
  <div class="view-create-folder">
    <div content>
      <TPTitle subtitle="Create a new" title="Folder" />
      <br />

      <tl-grid gap="10px 20">
        <tc-input
          icon="anchor"
          :dark="$store.getters.dark"
          :frosted="true"
          title="Name"
          v-model="name"
        />

        <tc-input
          icon="color-fan"
          :dark="$store.getters.dark"
          :frosted="true"
          title="Color"
          type="color"
          v-model="color"
        />
        <tl-flow>
          <div class="icon">
            <i :class="'ti-' + icon"></i>
          </div>
          <tc-input
            icon="ti"
            :dark="$store.getters.dark"
            :frosted="true"
            title="Icon"
            v-model="icon"
          />
        </tl-flow>
      </tl-grid>

      <br />
      <tl-flow>
        <tc-button
          icon="plus"
          name="Create Folder"
          tfbackground="success"
          variant="opaque"
        />
        <tc-button
          icon="blocked"
          name="cancel"
          tfbackground="error"
          variant="opaque"
          @click="back"
        />
      </tl-flow>
    </div>
  </div>
</template>

<script lang="ts">
import TPTitle from '@/components/TPTitle.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    TPTitle,
  },
})
export default class CreateFolder extends Vue {
  public name = '';
  public color = '';
  public icon = '';

  get parent(): string | null {
    const parent = this.$route.query.parent;
    if (parent) return parent as string;
    return null;
  }

  public back(): void {
    const parent = this.parent;
    if (parent) {
      this.$router.push({ name: 'folder', params: { id: parent } });
    } else {
      this.$router.push({ name: 'home' });
    }
  }
}
</script>

<style lang="scss" scoped>
.view-create-folder {
  .tl-flow {
    .tc-input {
      flex-grow: 1;
    }
    .icon {
      width: 30px;
      height: 30px;
      margin-top: 30px;
      background: rgba(#000, 0.2);
      border-radius: 50%;
      display: grid;
      place-content: center;
    }
  }
}
</style>
