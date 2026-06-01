interface RegionData {
    name: string
    farms: number | null
}

interface Props {
    data: RegionData[]
}

export function DenmarkMap({ data }: Props) {
    function getFarms(region: string) {
        return data.find((d) => d.region === region)?.farms ?? "ingen data"
    }

    return (
        <svg viewBox="0 0 300 400" width="300" height="400">
            {/* Nordjylland */}
            <rect x="80" y="20" width="140" height="80" fill="#D6E4F0" stroke="#fff" />
            <text x="150" y="55" textAnchor="middle" fontSize="10">Nordjylland</text>
            <text x="150" y="70" textAnchor="middle" fontSize="10">{getFarms("Region Nordjylland")}</text>

            {/* Midtjylland */}
            <rect x="60" y="100" width="140" height="80" fill="#AED6F1" stroke="#fff" />
            <text x="130" y="135" textAnchor="middle" fontSize="10">Midtjylland</text>
            <text x="130" y="150" textAnchor="middle" fontSize="10">{getFarms("Region Midtjylland")}</text>

            {/* Syddanmark */}
            <rect x="60" y="180" width="140" height="70" fill="#D6E4F0" stroke="#fff" />
            <text x="130" y="210" textAnchor="middle" fontSize="10">Syddanmark</text>
            <text x="130" y="225" textAnchor="middle" fontSize="10">{getFarms("Region Syddanmark")}</text>

            {/* Sjælland */}
            <rect x="200" y="130" width="90" height="80" fill="#AED6F1" stroke="#fff" />
            <text x="245" y="165" textAnchor="middle" fontSize="10">Sjælland</text>
            <text x="245" y="180" textAnchor="middle" fontSize="10">{getFarms("Region Sjælland")}</text>

            {/* Hovedstaden */}
            <rect x="220" y="210" width="70" height="50" fill="#D6E4F0" stroke="#fff" />
            <text x="255" y="232" textAnchor="middle" fontSize="10">Hovedstaden</text>
            <text x="255" y="247" textAnchor="middle" fontSize="10">{getFarms("Region Hovedstaden")}</text>
        </svg>
    )
}
