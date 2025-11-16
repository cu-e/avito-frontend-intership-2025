import { useEffect, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Button, Card, Text } from '@gravity-ui/uikit';
import { api } from '../../main.tsx';
import type { IModerator } from '../../core/api/moderators/moderators.type.ts';
import type {
  IActivityData,
  IDecisionsData,
  IGetStatsParams,
  IStatsSummary,
  TCategoriesDistribution,
} from '../../core/api/statistic/statistic.type.ts';

function computeDateRange(period: 'today' | 'last7' | 'last30'): { start: string; end: string } {
  const end = new Date();
  const start = new Date();
  end.setHours(23, 59, 59, 999);
  start.setHours(0, 0, 0, 0);
  if (period === 'last7') {
    start.setDate(end.getDate() - 6);
  } else if (period === 'last30') {
    start.setDate(end.getDate() - 29);
  }
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

function StatsPage() {
  const [me, setMe] = useState<IModerator>();
  const [period, setPeriod] = useState<'today' | 'last7' | 'last30'>('last7');
  const [summary, setSummary] = useState<IStatsSummary>();
  const [activityData, setActivityData] = useState<IActivityData[]>([]);
  const [decisionsData, setDecisionsData] = useState<IDecisionsData>();
  const [categoriesData, setCategoriesData] = useState<TCategoriesDistribution>({});

  useEffect(() => {
    const loadMe = async () => {
      const user = await api.moderators.getMe();
      setMe(user);
    };
    loadMe();
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      const { start, end } = computeDateRange(period);
      const params: IGetStatsParams = { startDate: start, endDate: end };
      const summaryRes = await api.stats.getSummary(params);
      setSummary(summaryRes);
      const activityRes = await api.stats.getChartActivity(params);
      const activity = Array.isArray(activityRes) ? activityRes : [activityRes];
      setActivityData(activity);
      const decisionsRes = await api.stats.getChartDecisions(params);
      setDecisionsData(decisionsRes);
      const categoriesRes = await api.stats.getChartCategories(params);
      setCategoriesData(categoriesRes);
    };
    loadStats();
  }, [period]);

  const decisionsArray = useMemo(() => {
    return decisionsData
      ? [
          { name: 'Одобрено', value: decisionsData.approved },
          { name: 'Отклонено', value: decisionsData.rejected },
          { name: 'Изменения', value: decisionsData.requestChanges },
        ]
      : [];
  }, [decisionsData]);

  const categoriesArray = useMemo(() => {
    return Object.entries(categoriesData || {}).map(([name, value]) => ({ name, value }));
  }, [categoriesData]);

  const summaryArray = useMemo(() => {
    return summary
      ? [
          { name: 'Сегодня', value: summary.totalReviewedToday },
          { name: 'Неделя', value: summary.totalReviewedThisWeek },
          { name: 'Месяц', value: summary.totalReviewedThisMonth },
        ]
      : [];
  }, [summary]);

  const colors = ['#00c49f', '#df3636', '#FFBB28', '#FF8042', '#AA64E2', '#F06595'];

  const periods = [
    { key: 'today', label: 'Сегодня' },
    { key: 'last7', label: 'Последние 7 дней' },
    { key: 'last30', label: 'Последние 30 дней' },
  ] as const;

  return (
    <main
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
        gap: 24,
        alignItems: 'flex-start',
      }}
    >
      <section
        style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: -60 }}
      >
        <Text variant={'display-1'} style={{ fontWeight: '700', margin: '12px 0' }}>
          Статистика и профиль
        </Text>
        <Card style={{ display: 'flex', flexDirection: 'column', padding: '14px 12px' }}>
          <Text variant={'display-1'}>Привет, {me?.name}!</Text>
          <br />
          <Text variant={'body-3'}>Email: {me?.email ?? '-'}</Text>
          <Text variant={'body-3'}>Роль: {me?.role ?? '-'}</Text>
        </Card>
        <Card style={{ display: 'flex', flexDirection: 'column', padding: '14px 12px' }}>
          <Text variant={'display-1'}>{me?.statistics.todayReviewed ?? '-'}</Text>
          <Text variant={'body-2'}>Сегодня проверено</Text>
          <Text variant={'display-1'}>{me?.statistics.thisWeekReviewed ?? '-'}</Text>
          <Text variant={'body-2'}>За неделю проверено</Text>
          <Text variant={'display-1'}>{me?.statistics.thisMonthReviewed ?? '-'}</Text>
          <Text variant={'body-2'}>За месяц проверено</Text>
        </Card>
        <Card style={{ display: 'flex', flexDirection: 'column', padding: '14px 12px' }}>
          <Text variant={'display-1'}>{me?.statistics.approvalRate ?? '-'}%</Text>
          <Text variant={'body-2'}>Процент одобренных</Text>
        </Card>
        <Card style={{ display: 'flex', flexDirection: 'column', padding: '14px 12px' }}>
          <Text variant={'display-1'}>{me?.statistics.averageReviewTime ?? '-'}s</Text>
          <Text variant={'body-2'}>Среднее время просмотра</Text>
        </Card>
      </section>
      <section>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {periods.map((p) => (
            <Button
              key={p.key}
              view={period === p.key ? 'action' : 'normal'}
              size="l"
              onClick={() => setPeriod(p.key)}
            >
              <Text color={period === p.key ? 'inverted-primary' : 'primary'}>{p.label}</Text>
            </Button>
          ))}
        </div>
        <Card style={{ marginBottom: 16, padding: '14px 12px' }}>
          <Text variant={'body-1'} style={{ marginBottom: 12, fontWeight: 600 }}>
            Активность по датам
          </Text>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <LineChart data={activityData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="approved" stroke="#4caf50" name="Одобрено" />
                <Line type="monotone" dataKey="rejected" stroke="#f44336" name="Отклонено" />
                <Line type="monotone" dataKey="requestChanges" stroke="#ff9800" name="Изменения" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card style={{ marginBottom: 16, padding: '14px 12px' }}>
          <Text variant={'body-1'} style={{ marginBottom: 12, fontWeight: 600 }}>
            Распределение решений
          </Text>
          <div style={{ width: '100%', height: 320, display: 'flex', justifyContent: 'center' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={decisionsArray} dataKey="value" nameKey="name" outerRadius={120} label>
                  {decisionsArray.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card style={{ marginBottom: 16, padding: '14px 12px' }}>
          <Text variant={'body-1'} style={{ marginBottom: 12, fontWeight: 600 }}>
            Распределение по категориям
          </Text>
          <div style={{ width: '100%', height: 360 }}>
            <ResponsiveContainer>
              <BarChart data={categoriesArray} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} angle={-30} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Количество" fill="#2196f3" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card style={{ padding: '14px 12px' }}>
          <Text variant={'body-1'} style={{ marginBottom: 12, fontWeight: 600 }}>
            Сводка: количество проверок
          </Text>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={summaryArray} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Проверено" fill="#673ab7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>
    </main>
  );
}

export default StatsPage;
