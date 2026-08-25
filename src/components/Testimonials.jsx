import SectionHeading from './SectionHeading'
import LogoCarousel from './LogoCarousel'

// Web-optimized copies (800px JPEG) generated from src/assets/Sadana_Client_Logos_Enhanced
const clientLogoModules = import.meta.glob('../assets/clients/*.{jpg,png}', {
  eager: true,
  import: 'default',
})

const CLIENT_NAMES = {
  2: 'Agarwal Group',
  3: 'Golden Leaves',
  4: 'Dainik Bhaskar Group',
  5: 'Club Mahindra',
  6: 'Prestige University',
  8: 'Malwa Institute of Science & Management',
  9: 'Bank of India',
  10: 'OPPO',
  11: 'Sahil',
  12: 'Being Human',
  13: 'Ode',
  14: 'Prestige Group of Industries',
  16: 'AFC Hotel Banquet & Restaurant',
  17: 'Ocean Park Luxury Homes',
  18: 'Billabong High',
  19: 'Sheisha Skylounge',
  20: 'Nakhrali Dhani',
  21: 'Rudraksh Kingston',
  22: 'Tonic Restaurant',
  23: 'KIBS Hospital',
  24: 'Lemon Tree Hotels',
  25: 'CGII',
  26: 'Mithya',
  27: 'Oriental University',
  28: 'Brilliant Convention Centre',
  29: 'Matrix',
  30: 'Yaary Bar Lounge & Restaurant',
  31: 'Food Prang Boutique',
  32: 'Takshit Infratech',
  33: 'The Grand Venus',
  34: 'Rester Select',
  35: 'Shaligram Developers',
  36: 'Ralamandal Wildlife Sanctuary',
  37: 'Skye Luxuria',
  38: 'Bank of Baroda',
}

const clientLogos = Object.entries(clientLogoModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => {
    const num = Number(path.match(/(\d+)\.(jpg|png)$/)?.[1] ?? 0)
    return { src, name: CLIENT_NAMES[num] || 'Valued Client' }
  })

export default function Testimonials() {
  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-none px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title="Happy Clients"
          text="Fifteen years of relationships built one room at a time."
          className="max-w-2xl"
        />

        <div className="mt-10">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">
            Brands & institutions we have served
          </p>
          <div className="mt-8">
            <LogoCarousel
              items={clientLogos}
              renderItem={(logo) => (
                <div className="group flex aspect-[3/2] w-full items-center justify-center overflow-hidden rounded-xl bg-ivory p-3 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft sm:p-4">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    loading="lazy"
                    className="h-full w-full object-contain p-1 transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
