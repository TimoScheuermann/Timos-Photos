<template>
  <div class="view-login">
    <tl-flow flow="column" content>
      <img width="180" src="pwa/logo.png" alt="" />
      <TPTitle title="Login" />

      <tc-list :dark="$store.getters.dark" :frosted="true">
        <tc-list-item
          icon="google"
          title="Sign in with Google"
          @click="signIn('google')"
        />
      </tc-list>
    </tl-flow>
  </div>
</template>

<script lang="ts">
import TPTitle from '@/components/TPTitle.vue';
import { signIn } from '@/utils/auth';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    TPTitle,
  },
})
export default class Login extends Vue {
  public signIn(provider = 'google'): void {
    signIn(provider);
  }
}
</script>

<style lang="scss" scoped>
.view-login {
  .tc-list {
    margin-top: 50px;
    width: 300px;
    max-width: 80vw;
  }
}
</style>
