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
          v-model="dto.name"
        />

        <tc-input
          icon="color-fan"
          :dark="$store.getters.dark"
          :frosted="true"
          title="Color"
          type="color"
          v-model="dto.color"
        />
        <tl-flow>
          <div class="icon">
            <i :class="'ti-' + dto.icon"></i>
          </div>
          <tc-input
            icon="ti"
            :dark="$store.getters.dark"
            :frosted="true"
            title="Icon"
            v-model="dto.icon"
          />
        </tl-flow>
      </tl-grid>

      <br />
      <tl-flow>
        <tc-button
          :disabled="submitting"
          icon="plus"
          name="Update Folder"
          tfbackground="success"
          variant="opaque"
          @click="update"
        />
        <tc-button
          :disabled="submitting"
          icon="repeat"
          name="reset"
          tfbackground="alarm"
          variant="opaque"
          @click="reset"
        />
        <tc-button
          :disabled="submitting"
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
import backend from '@/utils/backend';
import {
  FolderManager,
  PatchFolderDto,
  TPFolderModel,
} from '@/utils/FolderManager';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    TPTitle,
  },
})
export default class EditFolder extends Vue {
  public submitting = false;
  public dto: PatchFolderDto = {
    name: '',
    color: '',
    icon: '',
  };

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
      this.dto = {
        name: folder.name,
        color: folder.color,
        icon: folder.icon,
      };
    }
  }

  public back(): void {
    this.$router.push({ name: 'folder', params: { id: this.id } });
  }

  public update(): void {
    if (this.submitting) return;
    this.submitting = true;
    backend
      .patch('photos/folder/' + this.id, { ...this.folder, ...this.dto })
      .then(({ data }) => {
        FolderManager.updateFolder(data);
        this.$router.push({ name: 'folder', params: { id: data.id } });
      })
      .catch((error) => {
        console.log(error);
        this.submitting = false;
      });
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
