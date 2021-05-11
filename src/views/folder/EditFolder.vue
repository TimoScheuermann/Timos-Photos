<template>
  <div class="view-edit-folder">
    <tl-flow flow="column" mtop v-if="!folder">
      <tc-spinner :dark="$store.getters.dark" size="20" />
      <p>Loading data</p>
    </tl-flow>
    <div content v-else>
      <TPTitle subtitle="Edit folder" :title="folder.name" />

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
          name="Update Folder"
          tfbackground="success"
          variant="opaque"
        />
        <tc-button
          icon="repeat"
          name="reset"
          tfbackground="alarm"
          variant="opaque"
          @click="reset"
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
import { FolderManager, TPFolderModel } from '@/utils/FolderManager';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    TPTitle,
  },
})
export default class EditFolder extends Vue {
  public name = '';
  public color = '';
  public icon? = '';

  async mounted(): Promise<void> {
    if (!this.folder) {
      await FolderManager.loadFolders();
      if (!this.folder) {
        this.$router.push({ name: 'home' });
      }
    }
    this.reset();
  }

  get id(): string {
    return this.$route.params.id;
  }

  get folder(): TPFolderModel | null {
    return FolderManager.getFolder(this.id);
  }

  public reset(): void {
    const folder = this.folder;
    if (folder) {
      this.name = folder.name;
      this.icon = folder.icon;
      this.color = folder.color;
    }
  }

  public back(): void {
    this.$router.push({ name: 'folder', params: { id: this.id } });
  }
}
</script>

<style lang="scss" scoped>
.view-edit-folder {
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
