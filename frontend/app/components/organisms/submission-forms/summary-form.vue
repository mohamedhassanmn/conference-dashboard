<script setup lang="ts">
const submissionDetails = [
    { label: 'Title', value: 'Determining and Optimizing for Plasma Current, Centroid Position, and Shape in the DEMOnstration Power Plant Using Bayesian Integrated Data Analysis and Experimental Design' },
    {
        label: 'Abstract', value: `ABSTRACT. Particle contamination control for particles down to submicron sizes is a crucial aspect of semiconductor processing and etching technologies. In recent times this aspect has also become crucial for the lithographic patterning process with the introduction of extremeultraviolet (EUV) lithography which uses highly energetic EUV photons (13.5 nm, 92 eV). One of the side effects of this development is the generation of EUV-induced plasma due to the interactions of highly energetic EUV photons with low pressure (1–10 Pa) background hydrogen gas. The lithography machines operate in pulsed mode with EUV pulses of < 100 nsin every 20 μs. The spatial and temporal evolution of the EUV induced plasmas has been investigated using 3D particle-in-cell (PIC) model. This shows the EUV light beam creating the plasma in < 100 ns (Fig.1a), whereafter it spreads and decays in the remaining 19.9 μs afterglow (Fig. 1b). This also impacts the particle contaminants: they become positive withinthe EUV beam due to the photoelectric effect and they become negative outside and after the beam passage due to EUV-induced plasma. The location of charged particles during the EUV pulse and in the afterglow is shown below in Fig. 1(c-d) . The multi-pulse population dynamics of charged particles is shown in Fig. 1e. This shows a peaked increase in positive particle population during every EUV pulse and a steady increase of negative particle population during multiple afterglows.%SVL insert figure
Figure 1: Spatial distribution profile of electron density at Reticle Mini-Environment within ASML lithographymachine is shown (a) within EUV pulse (< 100 ns) and (b) after pulse (100 ns - 20 $\mu$ s) in the afterglow condition.(c-d) The typical population characteristics of 100 nm charged (positive: red and negative: blue) particles are shown in the two regimes mentioned in (a-b). For multi-pulse scenario, the population dynamics of charged and neutral particles are shown in (e). The population of neutral particle decreases over time at the expense ofnegatively charged particle generation. However, the population of positively charged particle remains steady over time.
Reference:“Particle charging during pulsed EUV exposures with afterlow effect”, M.Chaudhuri, L.C.J. Heijmans, M. van de Kerkhof, P. Krainov, D. Astakhov and A. M.Yakunin, Plasma Sources Sci. Technol. 32, 095005 (2023)` },
    { label: 'Keywords', value: 'Computer, World, Paper, Pen.' },
    { label: 'Paper', value: 'Robotics paper.pdf' },
];

const authorsDetails = [
    [
        { label: 'First name', value: 'Naruto' },
        { label: 'Last name', value: 'Uzumaki' },
        { label: 'Email', value: 'naruto.uzumaki@staff.easychair.my' },
        { label: 'Country', value: 'Hidden Leaf Village' },
        { label: 'Organization', value: 'Under Hokage' },
        { label: 'Web page', value: 'uzumaki.hlv' },
    ],
    [
        { label: 'First name', value: 'Hinata' },
        { label: 'Last name', value: 'Hyuga' },
        { label: 'Email', value: 'hinata.hyuga@staff.easychair.my' },
        { label: 'Country', value: 'Hidden Leaf Village' },
        { label: 'Organization', value: 'Under Hokage' },
        { label: 'Web page', value: 'hyuga.hlv' },
    ],
];

const isExpanded = ref(false)
const ABSTRACT_LIMIT = 300

const toggleAbstract = () => {
    isExpanded.value = !isExpanded.value
}

const getAbstractText = (text: string) => {
    if (isExpanded.value) return text
    return text.slice(0, ABSTRACT_LIMIT) + '...'
}
</script>

<template>
    <div class="w-full h-full flex flex-col items-center">
        <div class="w-full mt-10 pr-8 h-160 overflow-y-auto scrollbar-thin">
            <h2 class="text-xl font-semibold">Submission detail:</h2>
            <div class="border border-neutral-200 rounded-xl px-4 py-3 mt-1">
                <div v-for="submissionData in submissionDetails" :key="submissionData.label"
                    class="flex justify-between mt-6">
                    <div class="font-medium mr-4 w-32">
                        {{ submissionData.label }}
                    </div>
                    <div class="w-96 text-sm leading-relaxed">
                        <template v-if="submissionData.label === 'Abstract'">
                            <p>
                                {{ getAbstractText(submissionData.value) }}
                                <button class="mt-2 text-blue-600 text-sm font-medium hover:underline"
                                    @click="toggleAbstract">
                                    {{ isExpanded ? 'See less' : 'See more' }}
                                </button>
                            </p>
                        </template>
                        <template v-else>
                            {{ submissionData.value }}
                        </template>
                    </div>
                </div>
            </div>
            <h2 class="text-xl mt-8 font-semibold">Authors detail:</h2>
            <div class="border border-neutral-200 rounded-xl px-4 py-3 mt-1">
                <div v-for="authorData, i in authorsDetails" :key="i" class="flex justify-between mt-6">
                    <div class="font-medium mr-4 w-32">
                        Author {{ i + 1 }}
                    </div>
                    <div class="w-96 text-sm leading-relaxed">
                        <template v-for="authorDetail in authorData" :key="authorDetail.label">
                            <div class="flex justify-between mt-2">
                                <div class="font-medium mr-4 w-2/5">
                                    {{ authorDetail.label }}
                                </div>
                                <div class="w-3/5 text-sm leading-relaxed">
                                    {{ authorDetail.value }}
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <button class="bg-neutral-400 text-primary-100 font-semibold px-11 py-3.5 rounded-14 mt-8 hover:underline">
            Submit and Complete
        </button>
    </div>
</template>