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
          name="Create Folder"
          tfbackground="success"
          variant="opaque"
          @click="create"
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
import { CreateFolderDto, FolderManager } from '@/utils/FolderManager';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    TPTitle,
  },
})
export default class CreateFolder extends Vue {
  public submitting = false;

  public dto: CreateFolderDto = {
    name: '',
    color: '',
    icon: '',
  };

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

  public create(): void {
    if (this.submitting) return;
    this.submitting = true;
    backend
      .post('photos/folder', { ...this.dto, parent: this.parent })
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
