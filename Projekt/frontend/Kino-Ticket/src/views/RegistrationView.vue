<script lang="ts" setup>
  import {RouterLink} from "vue-router";
  import InputField from "../components/Login/InputField.vue";
  import { useAuthStore } from "../stores/auth.ts";
  import {ref} from "vue";
  import router from "../router";

  // ref username, email und passwort
  const username = ref<string>('');
  const email = ref<string>('');
  const password = ref<string>('');

  function assignUsername(u: string): void {
    username.value = u.trim();
  }

  function assignEmail(e: string): void {
    email.value = e;
  }

  function assignPassword(p: string): void {
    password.value = p;
  }

  // neuen user registrieren
  const auth = useAuthStore();
  const error = ref('');
  const success = ref<boolean>(false);
  async function createNewUserFunction() {
    try{
      success.value = false;
      await auth.register(username.value, email.value, password.value);
      success.value = true;
      await router.push(`/`);
    }catch(e: any) {
      error.value = e ?? "Registration fehlgeschlagen"
    }
  }
</script>

<template>
  <div style="font-family: 'Bebas Neue', sans-serif;" class="min-h-[100vh] flex items-center justify-center gap-4 mb-8 mt-10 tracking-wide
">
    <!--  Zurück Button-->
<!--    <div style="background-color: var(&#45;&#45;color-secondary); color: var(&#45;&#45;color-secondary-text)" class="absolute top-20 left-10 w-fit rounded-xl text-center text-base font-bold">-->
<!--      <RouterLink to="/"><button>Zurück</button></RouterLink>-->
<!--    </div>-->

<!--    Der Login Screen-->
    <div>
      <div>
        <!--  Logo -->
      </div>
      <div style="background-color: var(--color-secondary)" class="px-6 py-4 w-fit rounded-xl min-w-[420px]">
        <div style="color: var(--color-normal-text)" class="my-4 w-full text-center">
          <h4 class="font-bold text-2xl">Willkommen bei Kino Gold</h4>
          <p class="text-sm">Registriere dich, um Tickets zu buchen</p>
        </div>

        <!--  Input fields-->
        <div>
          <form @submit.prevent="createNewUserFunction">
            <div>
              <InputField @input="assignUsername" inputName="username" inputType="text" label="Benutzername" placeholder="Max Mustermann"></InputField>
              <InputField @input="assignEmail" inputName="email" inputType="email" label="E-Mail" placeholder="Max@email.com"></InputField>
              <InputField @input="assignPassword" inputName="password" inputType="password" label="Passwort" placeholder="123Sicher"></InputField>
            </div>

            <!-- Angemeldet bleiben -->
            <div class="flex items-center justify-between gap-2 my-3 text-xs">
              <div class="flex items-center justify-start gap-1">
                <input type="checkbox" id="checkbox" name="checkbox" class="bg-transparent cursor-pointer"/>
                <label for="checkbox" class="cursor-pointer">Angemeldet bleiben</label>
              </div>
            </div>

            <p v-if="error" class="text-red-600 py-2">{{ error }}</p>

            <button type="submit" class="w-full rounded-xl mt-2"><span class="font-base font-bold">Registrieren</span></button>
          </form>

          <div id="divider" class="my-4 w-full">
            <span class="flex items-center gap-2 uppercase text-xs">oder</span>
          </div>

          <div class="flex items-center gap-2 uppercase my-4 w-full">
            <button class="flex-1"><i class="fa-brands fa-google"></i></button>
            <button class="flex-1"><i class="fa-brands fa-apple"></i></button>
            <button class="flex-1"><i class="fa-brands fa-facebook"></i></button>
          </div>

          <div class="flex items-center justify-center gap-1 my-5 w-full text-xs">
            <span class="">Schon ein Konto?</span>
            <RouterLink to="/login" style="color: var(--color-secondary-text)" class="font-bold underline">Hier Anmelden</RouterLink>
          </div>
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
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: var(--color-primary);
  color: var(--color-primary-text);
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  border: 2px solid var(--color-primary);
}

button:hover {
  border-color: var(--color-primary);
  background-color: var(--color-secondary);
  color: var(--color-secondary-text);
}
button:focus,
button:focus-visible {
  outline: 2px auto var(--color-primary);
}
</style>