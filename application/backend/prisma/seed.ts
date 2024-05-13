const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    
    const gameLocations = [
        {
            city_id: 1,
            name: 'Downtown Arena',
            address: '123 Main St, Metropolis',
            description: 'Large indoor arena with multiple sports facilities.',
            parking: 'Available',
            fee: '20',
            map_url: 'https://maps.example.com/downtown-arena',
            locationLatitude: 40.7128,
            locationLongitude: -74.0060
        },
        {
            city_id: 1,
            name: 'Riverside Field',
            address: '456 River Rd, Metropolis',
            description: 'Outdoor fields suitable for soccer and rugby.',
            parking: 'Limited',
            fee: '15',
            map_url: 'https://maps.example.com/riverside-field',
            locationLatitude: 40.7143,
            locationLongitude: -74.0067
        },
        {
            city_id: 2,
            name: 'Central Sports Complex',
            address: '789 Center Ave, Metropolis',
            description: 'State-of-the-art sports complex with facilities for basketball and volleyball.',
            parking: 'Available',
            fee: '25',
            map_url: 'https://maps.example.com/central-sports',
            locationLatitude: 40.7138,
            locationLongitude: -74.0059
        },
        {
            city_id: 2,
            name: 'Westside Tennis Courts',
            address: '101 Tennis Ct, Metropolis',
            description: 'Outdoor tennis courts with night lighting.',
            parking: 'Available',
            fee: '10',
            map_url: 'https://maps.example.com/westside-tennis',
            locationLatitude: 40.7165,
            locationLongitude: -74.0102
        },
        {
            city_id: 1,
            name: 'East End Pool',
            address: '202 Poolside Blvd, Metropolis',
            description: 'Olympic-size swimming pool with diving boards.',
            parking: 'Limited',
            fee: '15',
            map_url: 'https://maps.example.com/east-end-pool',
            locationLatitude: 40.7100,
            locationLongitude: -74.0075
        },
        {
            city_id: 1,
            name: 'North Park Field',
            address: '303 Park Ave, Metropolis',
            description: 'Public sports field suitable for football and cricket.',
            parking: 'Available',
            fee: '0',
            map_url: 'https://maps.example.com/north-park-field',
            locationLatitude: 40.7190,
            locationLongitude: -74.0010
        },
        {
            city_id: 1,
            name: 'Southside Gymnasium',
            address: '404 South St, Metropolis',
            description: 'Indoor gymnasium for basketball and gymnastics.',
            parking: 'Available',
            fee: '20',
            map_url: 'https://maps.example.com/southside-gym',
            locationLatitude: 40.7120,
            locationLongitude: -74.0030
        },
        {
            city_id: 1,
            name: 'Harbor Sports Arena',
            address: '505 Harbor Rd, Metropolis',
            description: 'Arena near the harbor, hosts multiple sports events.',
            parking: 'Paid',
            fee: '30',
            map_url: 'https://maps.example.com/harbor-sports',
            locationLatitude: 40.7111,
            locationLongitude: -74.0022
        },
        {
            city_id: 1,
            name: 'Mountain View  Park',
            address: '606 Mountain Rd, Metropolis',
            description: 'Park with cycling tracks and beautiful mountain views.',
            parking: 'Available',
            fee: '5',
            map_url: 'https://maps.example.com/mountain-view-cycling',
            locationLatitude: 40.7155,
            locationLongitude: -74.0061
        },
        {
            city_id: 1,
            name: 'Riverbank  Club',
            address: '707 Riverside Dr, Metropolis',
            description: 'Club for rowing enthusiasts with equipment rental.',
            parking: 'Available',
            fee: '20',
            map_url: 'https://maps.example.com/riverbank-rowing',
            locationLatitude: 40.7104,
            locationLongitude: -74.0088
        },
        {
            city_id: 1,
            name: 'Urban  Park',
            address: '808 Skate St, Metropolis',
            description: 'Skate park with ramps and rails for skateboarding and rollerblading.',
            parking: 'Limited',
            fee: '0',
            map_url: 'https://maps.example.com/urban-skate-park',
            locationLatitude: 40.7189,
            locationLongitude: -74.0029
        },
        {
            city_id: 1,
            name: 'Highland Course',
            address: '909 Golf Rd, Metropolis',
            description: '18-hole golf course with scenic highland views.',
            parking: 'Available',
            fee: '50',
            map_url: 'https://maps.example.com/highland-golf',
            locationLatitude: 40.7167,
            locationLongitude: -74.0044
        }
        
    ];

    // Use a loop to create each game location
    for (const location of gameLocations) {
        await prisma.gameLocation.create({
            data: location
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
