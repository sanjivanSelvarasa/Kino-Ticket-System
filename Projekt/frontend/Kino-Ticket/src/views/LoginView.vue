<script lang="ts" setup>
  import {RouterLink} from "vue-router";
  import InputField from "../components/Login/InputField.vue";
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
          <h4 class="font-bold text-2xl">Willkommen zurück</h4>
          <p class="text-sm">Melde dich an, um Tickets zu buchen</p>
        </div>

        <!--  Input fields-->
        <div>
          <InputField inputName="email" inputType="email" label="E-Mail" placeholder="Max@email.com"></InputField>
          <InputField inputName="password" inputType="password" label="Passwort" placeholder="123Sicher"></InputField>
        </div>

        <!--      Angemeldet bleiben & Passwort vergessen?-->
        <div class="flex items-center justify-between gap-2 my-3 text-xs">
          <div class="flex items-center justify-start gap-1 cursor-pointer">
            <input type="checkbox" id="checkbox" name="checkbox" class="bg-transparent cursor-pointer"/>
            <label for="checkbox" class="cursor-pointer">Angemeldet bleiben</label>
          </div>
          <RouterLink style="color: var(--color-secondary-text)" class="underline" to="/">Passwort vergessen?</RouterLink>
        </div>

        <button :style="{ border: 'none' }" style="background-color: var(--color-primary); color: var(--color-primary-text)" class="w-full rounded-xl mt-2"><span class="font-base font-bold">Anmelden</span></button>

        <div id="divider" class="my-4 w-full">
          <span class="flex items-center gap-2 uppercase text-xs">oder</span>
        </div>

        <div class="flex items-center gap-2 uppercase my-4 w-full">
          <button class="flex-1"><i class="fa-brands fa-google"></i></button>
          <button class="flex-1"><i class="fa-brands fa-apple"></i></button>
          <button class="flex-1"><i class="fa-brands fa-facebook"></i></button>
        </div>

        <div class="flex items-center justify-center gap-1 my-5 w-full text-xs">
          <span class="">Noch kein Konto?</span>
          <RouterLink to="/registration" style="color: var(--color-secondary-text)" class="font-bold underline">Jetzt regristrieren</RouterLink>
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

  button {
    border-radius: 8px;
    border: 2px solid var(--color-normal-text);
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: var(--color-secondary);
    cursor: pointer;
    transition: border-color 0.25s;
  }

  button:hover {
    border-color: var(--color-primary);
  }
  button:focus,
  button:focus-visible {
    outline: 2px auto var(--color-primary);
  }
</style>