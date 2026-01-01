<script lang="ts" setup>
import {onMounted, ref} from "vue";
import type {Movie} from "../types/movie.ts";
import {moviesRepo} from "../api/moviesRepo.ts";

  const props = defineProps<{
    id: number;
  }>()

  const movie = ref<Movie>();
  const error = ref<string | null>(null);
  const loading = ref<boolean>(true);


  onMounted(async () => {
    try {
      movie.value = await moviesRepo.getById(props.id);
    }
    catch (e: any) {
      error.value = e.message ?? "Fehler beim Laden";
    }
    finally {
      loading.value = false;
    }
  })

  // current Date
  const date = new Date();
  const countNextDay = 6;
  const nextDates = getNextDays(date,countNextDay);

  function getNextDays(currentDate: Date, count: number) {
    let nextDays : Date[] = [];
    for (let i = 0; i < count; i++) {
      const d = new Date(currentDate);
      d.setDate(currentDate.getDate() + i);
      nextDays.push(d);
    }
    return nextDays;
  }

</script>

<template class="w-full">
  <div class="w-[900px] mx-auto my-30 min-w-fit">
    <h1 style="font-size: 48px !important;" class="mb-10">Wähle deine Sitze</h1>
    <div class="bg-[var(--color-normal-text)] text-[var(--color-primary-text)] px-10 py-6 rounded-2xl w-full">
      <div class="flex items-center justify-between w-full gap-2">
        <div class="flex-1">
          <label for="date" class="text-sm block mb-1">Date</label>
          <select name="date" id="date" required class="block px-4 py-3 w-full ticket-border outline-none">
            <option v-for="(item, i) in nextDates" :value="item">{{ item.getUTCDate()}} {{ new Intl.DateTimeFormat("de-DE", { weekday: "long"}).format(item)}}</option>
          </select>
        </div>
        <div class="flex-1">
          <label for="time" class="text-sm block mb-1">Time</label>
          <select name="time" id="time" required class="block px-4 py-3 w-full ticket-border outline-none">
            <option value="10:00 Uhr">10:00 Uhr</option>
            <option value="12:30 Uhr">12:30 Uhr</option>
            <option value="16:45 Uhr">16:45 Uhr</option>
          </select>
        </div>
      </div>
      <hr>
      <div class="py-8 w-full mb-10">
        <div class="h-[8px] mb-2 bg-black w-full bg-gradient-to-r from-white via-black to-white"></div>
        <span class="text-xs font-bold  block w-full text-center">Bildschirm auf dieser Seite</span>
      </div>
      <div class="mb-10">
        <div v-for="i in 10" class="mb-2 flex items-center justify-between">
          <span class="font-bold">{{ String.fromCharCode(96 + i).toUpperCase()}}</span>
          <div class="flex items-center justify-center w-full gap-2">
            <div v-for="i in 16" class="cursor-pointer w-[40px] h-[40px] rounded-t-xl bg-[rgb(240,240,240)]" ></div>
          </div>
          <span class="font-bold">{{ String.fromCharCode(96 + i).toUpperCase()}}</span>
        </div>
      </div>
      <hr>
      <div class="flex items-center justify-center w-full gap-8 mb-8 mt-8">
        <div class="flex items-center justify-center w-fit gap-2">
          <div class="w-[20px] h-[20px] rounded-t-md bg-[rgb(240,240,240)]"></div>
          <span class="text-sm">Verfügbar</span>
        </div>
        <div class="flex items-center justify-center w-fit gap-2">
          <div class="w-[20px] h-[20px] rounded-t-md bg-[var(--color-secondary)]"></div>
          <span class="text-sm">Ausgewählt</span>
        </div>
        <div class="flex items-center justify-center w-fit gap-2">
          <div class="w-[20px] h-[20px] rounded-t-md bg-[rgb(224,224,224)]"></div>
          <span class="text-sm">Belegt</span>
        </div>
      </div>

      <div class="w-full px-6 py-4 bg-[rgb(240,240,240)] rounded-md flex items-center justify-center gap-6">
        <div>
          <p class="font-bold">Executive · 25 CHF</p>
          <span class="text-xs block text-center">Reihen A-C</span>
        </div>
        <div>
          <p class="font-bold">Premium · 35 CHF</p>
          <span class="text-xs block text-center">Reihen D-G</span>
        </div>
        <div>
          <p class="font-bold">Platinum · 45 CHF</p>
          <span class="text-xs block text-center">Reihen H-J</span>
        </div>
      </div>

      <div class="flex justify-between items-center px-6 py-4 rounded-2xl bg-[var(--color-secondary)] my-6 text-[var(--color-secondary-text)]">
        <div class="flex items-start justify-center w-fit gap-2 flex-col">
          <span class="text-sm">Ausgewählte Sitze: Keine</span>
          <span class="text-2xl font-bold">Gesamt: 0 CHF</span>
        </div>
        <div class="flex items-center justify-center w-fit gap-4 flex-row">
          <button class="cursor-pointer text-md bg-[var(--color-normal-text)] text-[var(--color-primary-text)] px-6 py-4 font-bold rounded-full">Speichern</button>
          <button class="cursor-pointer text-md bg-[var(--color-primary)] text-[var(--color-primary-text)] px-6 py-4 font-bold rounded-full">Bestätigen & Zahlen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .ticket-border{
    border: 2px solid rgb(224, 224, 224);
    border-radius: 6px;
  }

  hr{
    border-top: 2px solid rgb(224, 224, 224);
    border-radius: 6px;
  }
</style>