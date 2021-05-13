<template>
  <div class="tp-navbar">
    <div class="container">
      <transition-group name="trans">
        <div v-if="!search" key="0" class="trans-wrapper">
          <div class="title" @click="goHome">Timo's <span>Photos</span></div>
        </div>
        <div v-if="search" key="1" class="trans-wrapper">
          <form @submit.prevent="submit">
            <tc-input
              v-if="search"
              key="1"
              :dark="$store.getters.dark"
              :frosted="true"
              icon="lens"
              placeholder="Search photos, folders, tags"
              v-model="query"
              pattern="*"
            />
          </form>
        </div>
      </transition-group>
      <div class="search" v-if="$store.getters.valid" @click="search = !search">
        <i class="ti-lens"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class TPNavbar extends Vue {
  public search = false;
  public query = '';

  public goHome(): void {
    if (!['home', 'login'].includes(this.$route.name || '')) {
      this.$router.push({ name: 'home' });
    }
  }

  public submit(): void {
    if (this.query.length > 0) {
      this.search = false;
      this.$router
        .push({ name: 'search', query: { q: this.query } })
        .catch(() => {
          /* */
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.tp-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 5vw;
  box-shadow: $shadow;

  @include backdrop-blur($color_dark);
  color: $color;

  @media #{$isDark} {
    @include backdrop-blur($color);
    color: $color_dark;
  }

  .container {
    padding-top: env(safe-area-inset-top);
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    position: relative;
  }

  .title {
    cursor: pointer;
    font-weight: 700;
    user-select: none;

    span {
      @include gradient-text();
    }
  }

  .trans-wrapper {
    position: absolute;
    top: env(safe-area-inset-top);
    display: flex;
    height: 50px;
    align-items: center;
  }
  .tc-input {
    width: 60vw;
    max-width: 300px;
    margin-left: 0;
  }

  .search {
    position: absolute;
    right: 0;
    cursor: pointer;

    padding: 10px;
    margin-right: -10px;
  }
}

.trans-enter-active,
.trans-leave-active {
  transition: all 0.25s ease-in-out;
}
.trans-enter,
.trans-leave-to {
  margin-top: 20px;
  opacity: 0;
}

.trans-leave-to {
  margin-top: -20px;
}
</style>
