<script lang="ts" setup>
  import {RouterLink} from "vue-router";
</script>

<template>
  <div style="font-family: 'Bebas Neue', sans-serif;" class="min-h-[100vh] flex items-center justify-center gap-4 mb-8 tracking-wide
">
    <!--  Zurück Button-->
    <div style="background-color: var(--color-secondary); color: var(--color-secondary-text)" class="absolute top-20 left-10 w-fit rounded-xl text-center text-base font-bold">
      <RouterLink to="/"><button>Zurück</button></RouterLink>
    </div>

<!--    Der Login Screen-->
    <div>
      <div>
        <!--  Logo -->
      </div>
      <div style="background-color: var(--color-secondary)" class="px-6 py-4 w-fit rounded-xl min-w-[420px]">
        <div style="color: var(--color-normal-text)" class="my-4 w-full text-center">
          <h2 class="font-bold text-2xl">Willkommen zurück</h2>
          <p class="text-sm">Melde dich an, um Tickets zu buchen</p>
        </div>

        <!--  Input fields-->
        <div>
          <label for="email" style="color: var(--color-secondary-text)" class="block text-xs mb-1 ml-1 uppercase" >E-Mail</label>
          <input id="email" type="email" name="email" placeholder="Max@email.com" required class="block px-4 py-3 w-full bg-white/5 border-white/10
 rounded-xl border-1 mb-4 text-sm">

          <label for="password" style="color: var(--color-secondary-text)" class="block text-xs mb-1 ml-1 uppercase" >Passwort</label>
          <input id="password" type="password" name="password" placeholder="123Sicher" required class="block px-4 py-3 w-full bg-white/5 border-white/10
 rounded-xl border-1 text-sm">
          </div>

        <!--      Angemeldet bleiben & Passwort vergessen?-->
        <div class="flex items-center justify-between gap-2 my-3 text-xs">
          <div class="flex items-center justify-start gap-1">
            <input type="checkbox" id="checkbox" name="checkbox" class="bg-transparent"/>
            <label for="checkbox">Angemeldet bleiben</label>
          </div>
          <RouterLink style="color: var(--color-secondary-text)" class="underline" to="/">Passwort vergessen?</RouterLink>
        </div>

        <button :style="{ border: 'none' }" style="background-color: var(--color-primary); color: var(--color-primary-text)" class="w-full rounded-xl mt-2"><span class="font-base font-bold">Anmelden</span></button>

        <div id="divider" class="my-4 w-full">
          <span class="flex items-center gap-2 uppercase text-xs">oder</span>
        </div>

        <div class="flex items-center gap-2 uppercase my-4 w-full">
          <button class="w-1/3"><i class="fa-brands fa-google"></i></button>
          <button class="w-1/3"><i class="fa-brands fa-apple"></i></button>
          <button class="w-1/3"><i class="fa-brands fa-facebook"></i></button>
        </div>

        <div class="flex items-center justify-center gap-1 my-5 w-full text-xs">
          <span class="">Noch kein Konto?</span>
          <RouterLink style="color: var(--color-secondary-text)" class="font-bold underline"> Jetzt regristrieren</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Huninn&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

  #divider span::before, #divider span::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }
</style>