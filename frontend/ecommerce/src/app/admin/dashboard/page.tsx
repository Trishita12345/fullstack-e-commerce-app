
import {
  Group,
  Text,
  Card,
  SimpleGrid,
  Badge,
  Table,
  Avatar,
  RingProgress,
  Progress,
  Stack,
  ThemeIcon,
  Button,
  ScrollArea,
  TableThead,
  TableTh,
  TableTd,
  TableTr,
  TableTbody,
} from "@mantine/core";
import {
  IconArrowUpRight,
  IconArrowDownRight,
} from "@tabler/icons-react";

export default function DashboardPage() {

  const stats = [
    {
      title: "Revenue",
      value: "$24,500",
      change: "+12.4%",
      positive: true,
    },
    {
      title: "Orders",
      value: "1,240",
      change: "+8.1%",
      positive: true,
    },
    {
      title: "Customers",
      value: "845",
      change: "-2.3%",
      positive: false,
    },
    {
      title: "Conversion Rate",
      value: "5.6%",
      change: "+1.2%",
      positive: true,
    },
  ];

  const rows = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      name: "Sarah Smith",
      email: "sarah@example.com",
      role: "Editor",
      status: "Pending",
    },
    {
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Viewer",
      status: "Inactive",
    },
  ];

  return (
    <>
      <Stack gap="lg" pt={16}>
        <Text size="xs" c={'dimmed'}><i>**This is a demo dashboard page and is not functional yet</i></Text>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
          {stats.map((stat) => (
            <Card key={stat.title} shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="xs">
                <Text size="sm" c="dimmed">
                  {stat.title}
                </Text>
                <ThemeIcon
                  color={stat.positive ? "green" : "red"}
                  variant="light"
                >
                  {stat.positive ? (
                    <IconArrowUpRight size={16} />
                  ) : (
                    <IconArrowDownRight size={16} />
                  )}
                </ThemeIcon>
              </Group>

              <Text fw={700} size="xl">
                {stat.value}
              </Text>

              <Badge
                mt="sm"
                color={stat.positive ? "green" : "red"}
                variant="light"
              >
                {stat.change}
              </Badge>
            </Card>
          ))}
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, lg: 3 }}>
          <Card withBorder radius="md" padding="lg">
            <Text fw={600} mb="md">
              Sales Progress
            </Text>

            <Stack gap="md">
              <div>
                <Group justify="space-between">
                  <Text size="sm">Monthly Goal</Text>
                  <Text size="sm">75%</Text>
                </Group>
                <Progress value={75} mt="xs" />
              </div>

              <div>
                <Group justify="space-between">
                  <Text size="sm">Quarterly Goal</Text>
                  <Text size="sm">58%</Text>
                </Group>
                <Progress value={58} color="orange" mt="xs" />
              </div>

              <div>
                <Group justify="space-between">
                  <Text size="sm">Yearly Goal</Text>
                  <Text size="sm">89%</Text>
                </Group>
                <Progress value={89} color="green" mt="xs" />
              </div>
            </Stack>
          </Card>

          <Card withBorder radius="md" padding="lg">
            <Text fw={600} mb="md">
              User Engagement
            </Text>

            <Group justify="center">
              <RingProgress
                size={180}
                thickness={16}
                sections={[
                  { value: 40, color: "blue" },
                  { value: 25, color: "cyan" },
                  { value: 20, color: "grape" },
                ]}
                label={
                  <Text ta="center" fw={700} size="xl">
                    85%
                  </Text>
                }
              />
            </Group>
          </Card>

          <Card withBorder radius="md" padding="lg">
            <Text fw={600} mb="md">
              Quick Actions
            </Text>

            <Stack>
              <Button fullWidth variant="light">
                Add New User
              </Button>
              <Button fullWidth variant="light" color="grape">
                Generate Invoice
              </Button>
              <Button fullWidth variant="light" color="orange">
                View Reports
              </Button>
              <Button fullWidth variant="light" color="green">
                Manage Settings
              </Button>
            </Stack>
          </Card>
        </SimpleGrid>

        <Card withBorder radius="md" padding="lg">
          <Group justify="space-between" mb="md">
            <Text fw={600}>Recent Users</Text>
            <Button variant="subtle" size="xs">
              View All
            </Button>
          </Group>

          <ScrollArea>
            <Table striped highlightOnHover>
              <TableThead>
                <TableTr>
                  <TableTh>User</TableTh>
                  <TableTh>Email</TableTh>
                  <TableTh>Role</TableTh>
                  <TableTh>Status</TableTh>
                </TableTr>
              </TableThead>

              <TableTbody>
                {rows.map((row) => (
                  <TableTr key={row.email}>
                    <TableTd>
                      <Group gap="sm">
                        <Avatar radius="xl" size="sm" />
                        <Text size="sm">{row.name}</Text>
                      </Group>
                    </TableTd>
                    <TableTd>{row.email}</TableTd>
                    <TableTd>{row.role}</TableTd>
                    <TableTd>
                      <Badge
                        color={
                          row.status === "Active"
                            ? "green"
                            : row.status === "Pending"
                              ? "yellow"
                              : "red"
                        }
                        variant="light"
                      >
                        {row.status}
                      </Badge>
                    </TableTd>
                  </TableTr>
                ))}
              </TableTbody>
            </Table>
          </ScrollArea>
        </Card>
      </Stack >
    </>
  );
}
